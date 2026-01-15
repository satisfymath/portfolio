import { useEffect, useRef, useState, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../lib/reducedMotion';

gsap.registerPlugin(ScrollTrigger);

// Detect iOS
const isIOS = () => {
    if (typeof window === 'undefined') return false;
    return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
};

interface VideoScrubProps {
    src: string;
    trigger?: string;
    start?: string;
    end?: string;
    className?: string;
    poster?: string;
    pin?: boolean;
    scrubDuration?: number;
    children?: ReactNode; // Content to overlay on video
}

/**
 * VideoScrub component - controls video playback via scroll position
 * With pin option: video stays fixed while all frames play
 * Children are rendered on top of the video
 * iOS compatible: uses direct currentTime manipulation with ScrollTrigger onUpdate
 */
export function VideoScrub({
    src,
    trigger,
    start = 'top top',
    end,
    className = '',
    poster,
    pin = false,
    scrubDuration = 1500,
    children,
}: VideoScrubProps) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    const videoId = src.split('/').pop() || 'unknown';
    const [isIOSDevice] = useState(isIOS);

    useEffect(() => {
        const video = videoRef.current;
        const container = containerRef.current;
        if (!video) return;

        const isiOS = isIOSDevice;
        console.log(`[VideoScrub:${videoId}] Init pin=${pin} iOS=${isiOS}`);

        // iOS/Safari autoplay requirements - set these before any interaction
        video.muted = true;
        video.playsInline = true;
        video.preload = 'auto';
        // Force load on iOS
        video.load();

        // Reduced motion: autoplay loop without scrub
        if (prefersReducedMotion()) {
            video.loop = true;
            video.autoplay = true;
            video.play().catch(() => { });
            return;
        }

        // Get the trigger element
        const triggerElement = pin ? container : (trigger ? document.querySelector(trigger) : null);
        if (!triggerElement) {
            console.error(`[VideoScrub:${videoId}] Trigger not found: ${trigger}`);
            return;
        }

        const onLoadedMetadata = () => {
            console.log(`[VideoScrub:${videoId}] Loaded: ${video.duration.toFixed(2)}s, ${video.videoWidth}x${video.videoHeight}`);

            // Pause for scroll control
            video.pause();
            video.currentTime = 0;

            // Kill any existing timeline/scrolltrigger
            if (timelineRef.current) timelineRef.current.kill();
            if (scrollTriggerRef.current) scrollTriggerRef.current.kill();

            // ScrollTrigger configuration
            const endValue = end || `+=${scrubDuration}`;

            if (isiOS) {
                // iOS: Use direct currentTime manipulation in onUpdate
                // This is more compatible with iOS Safari
                scrollTriggerRef.current = ScrollTrigger.create({
                    trigger: triggerElement,
                    start,
                    end: endValue,
                    scrub: true,
                    pin: pin,
                    pinSpacing: true,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        // Directly set currentTime based on scroll progress
                        const targetTime = self.progress * video.duration;
                        if (Math.abs(video.currentTime - targetTime) > 0.05) {
                            video.currentTime = targetTime;
                        }
                        const pct = Math.round(self.progress * 100);
                        if (pct % 25 === 0) {
                            console.log(`[${videoId}] ${pct}%`);
                        }
                    },
                });
            } else {
                // Desktop: Use GSAP timeline animation for smoother playback
                timelineRef.current = gsap.timeline({ defaults: { ease: 'none' } });
                timelineRef.current.to(video, { currentTime: video.duration }, 0);

                scrollTriggerRef.current = ScrollTrigger.create({
                    trigger: triggerElement,
                    start,
                    end: endValue,
                    scrub: 0.5,
                    pin: pin,
                    pinSpacing: true,
                    animation: timelineRef.current,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        const pct = Math.round(self.progress * 100);
                        if (pct % 25 === 0) {
                            console.log(`[${videoId}] ${pct}%`);
                        }
                    },
                });
            }

            ScrollTrigger.refresh();
        };

        video.addEventListener('loadedmetadata', onLoadedMetadata);

        // If already loaded (cached), trigger immediately
        if (video.readyState >= 1) {
            onLoadedMetadata();
        }

        // Cleanup
        return () => {
            console.log(`[VideoScrub:${videoId}] Cleanup`);
            video.removeEventListener('loadedmetadata', onLoadedMetadata);
            if (scrollTriggerRef.current) {
                scrollTriggerRef.current.kill();
                scrollTriggerRef.current = null;
            }
            if (timelineRef.current) {
                timelineRef.current.kill();
                timelineRef.current = null;
            }
        };
    }, [src, trigger, start, end, videoId, pin, scrubDuration, isIOSDevice]);

    // Pinned version: wrap video in a container with children overlay
    if (pin) {
        return (
            <div
                ref={containerRef}
                className="video-scrub-container"
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '100vh',
                    overflow: 'hidden',
                }}
            >
                {/* Video background */}
                <video
                    ref={videoRef}
                    className={className}
                    src={src}
                    poster={poster}
                    muted
                    playsInline
                    autoPlay={false}
                    preload="auto"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: 0,
                    }}
                />
                {/* Content overlay */}
                {children && (
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            zIndex: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            pointerEvents: 'none',
                        }}
                    >
                        <div style={{ pointerEvents: 'auto' }}>
                            {children}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Non-pinned version: regular video
    return (
        <video
            ref={videoRef}
            className={className}
            src={src}
            poster={poster}
            muted
            playsInline
            autoPlay={false}
            preload="auto"
        />
    );
}
