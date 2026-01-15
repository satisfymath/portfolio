import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../lib/reducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface VideoBackgroundSectionProps {
    id: string;
    videoSrc: string;
    children: ReactNode;
}

/**
 * VideoBackgroundSection - A section with video background that plays during scroll
 * The video plays as you scroll through the content inside
 */
export function VideoBackgroundSection({
    id,
    videoSrc,
    children,
}: VideoBackgroundSectionProps) {
    const sectionRef = useRef<HTMLElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    const videoId = videoSrc.split('/').pop() || 'unknown';

    useEffect(() => {
        const section = sectionRef.current;
        const video = videoRef.current;
        if (!section || !video) return;

        console.log(`[VideoBg:${videoId}] Init`);

        // Video setup
        video.muted = true;
        video.playsInline = true;
        video.preload = 'auto';

        // Ensure metadata is loaded for iOS
        if (video.readyState < 1) {
            video.load();
        }

        // Reduced motion: autoplay loop
        if (prefersReducedMotion()) {
            video.loop = true;
            video.autoplay = true;
            video.play().catch(() => { });
            return;
        }

        const onLoadedMetadata = () => {
            const width = video.videoWidth;
            const height = video.videoHeight;
            console.log(`[VideoBg:${videoId}] Metadata Loaded: ${video.duration.toFixed(2)}s, ${width}x${height}, ReadyState:${video.readyState}`);

            // iOS Hack: We must "play" the video to engage the decoder, then pause it immediately.
            // Just setting currentTime on a never-played video often results in a black screen on iOS.
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log(`[VideoBg:${videoId}] Kickstart play success, pausing now.`);
                    video.pause();
                    video.currentTime = 0;
                    initializeScrollTrigger();
                }).catch((error) => {
                    console.warn(`[VideoBg:${videoId}] Kickstart play failed (likely AutoPlay restrictions):`, error);
                    // Try to proceed anyway
                    video.pause();
                    initializeScrollTrigger();
                });
            } else {
                video.pause();
                initializeScrollTrigger();
            }
        };

        const initializeScrollTrigger = () => {
            // Kill existing
            if (timelineRef.current) timelineRef.current.kill();
            if (scrollTriggerRef.current) scrollTriggerRef.current.kill();

            console.log(`[VideoBg:${videoId}] Initializing GSAP timeline`);

            // Timeline animates video currentTime
            timelineRef.current = gsap.timeline({ defaults: { ease: 'none' } });

            // Add visibility logger to tween
            timelineRef.current.to(video, {
                currentTime: video.duration,
                onUpdate: function () {
                    // Log only occasionally to avoid spam
                    // const time = this.targets()[0].currentTime;
                    // console.log(`[${videoId}] Time: ${time.toFixed(2)}`);
                }
            }, 0);

            // ScrollTrigger
            scrollTriggerRef.current = ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1, // Smooth scrubbing
                animation: timelineRef.current,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    const pct = Math.round(self.progress * 100);
                    if (pct % 25 === 0) {
                        console.log(`[${videoId}] Scroll: ${pct}%, VideoTime: ${video.currentTime.toFixed(2)}/${video.duration.toFixed(2)}`);
                    }
                },
            });

            ScrollTrigger.refresh();
        };

        const onError = (e: Event) => {
            const target = e.target as HTMLVideoElement;
            console.error(`[VideoBg:${videoId}] ERROR:`, target.error);
        };

        video.addEventListener('loadedmetadata', onLoadedMetadata);
        video.addEventListener('error', onError);

        if (video.readyState >= 1) {
            console.log(`[VideoBg:${videoId}] Metadata already loaded via cache`);
            onLoadedMetadata();
        }

        return () => {
            console.log(`[VideoBg:${videoId}] Cleanup`);
            video.removeEventListener('loadedmetadata', onLoadedMetadata);
            video.removeEventListener('error', onError);
            if (scrollTriggerRef.current) scrollTriggerRef.current.kill();
            if (timelineRef.current) timelineRef.current.kill();
        };
    }, [videoSrc, videoId]);

    return (
        <section
            id={id}
            ref={sectionRef}
            style={{
                position: 'relative',
            }}
        >
            {/* Video background - fixed while in viewport */}
            <div
                style={{
                    position: 'sticky',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    overflow: 'hidden',
                    zIndex: 0,
                }}
            >
                <video
                    ref={videoRef}
                    src={videoSrc}
                    muted
                    playsInline
                    autoPlay={false}
                    preload="auto"
                    {...{ 'webkit-playsinline': 'true' }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            </div>

            {/* Content overlaid on video */}
            <div
                style={{
                    position: 'relative',
                    marginTop: '-100vh', // Pull content up over the video
                    zIndex: 1,
                }}
            >
                {children}
            </div>
        </section>
    );
}
