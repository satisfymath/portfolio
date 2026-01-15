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
            console.log(`[VideoBg:${videoId}] Loaded: ${video.duration.toFixed(2)}s`);

            video.pause();
            video.currentTime = 0;

            // Kill existing
            if (timelineRef.current) timelineRef.current.kill();
            if (scrollTriggerRef.current) scrollTriggerRef.current.kill();

            // Timeline animates video currentTime
            timelineRef.current = gsap.timeline({ defaults: { ease: 'none' } });
            timelineRef.current.to(video, { currentTime: video.duration }, 0);

            // ScrollTrigger: video plays as you scroll through section content
            scrollTriggerRef.current = ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1, // Smoother scrubbing
                animation: timelineRef.current,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    const pct = Math.round(self.progress * 100);
                    if (pct % 25 === 0) {
                        console.log(`[${videoId}] ${pct}%`);
                    }
                },
            });

            ScrollTrigger.refresh();
        };

        video.addEventListener('loadedmetadata', onLoadedMetadata);
        if (video.readyState >= 1) onLoadedMetadata();

        return () => {
            console.log(`[VideoBg:${videoId}] Cleanup`);
            video.removeEventListener('loadedmetadata', onLoadedMetadata);
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
