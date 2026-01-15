import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './reducedMotion';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Singleton instance
let lenisInstance: Lenis | null = null;
let rafId: number | null = null;

// Toggle this to test with/without Lenis
const USE_LENIS = false; // Set to true to enable smooth scroll

/**
 * Initialize Lenis smooth scroll with GSAP ScrollTrigger sync
 */
export function initLenis(): Lenis | null {
    // Skip for reduced motion
    if (prefersReducedMotion()) {
        console.log('[Lenis] Skipped due to prefers-reduced-motion');
        return null;
    }

    // If Lenis is disabled, just use native scroll
    if (!USE_LENIS) {
        console.log('[Lenis] Disabled - using native scroll');
        // Still need to setup ScrollTrigger defaults for native scroll
        ScrollTrigger.defaults({
            scroller: window,
        });
        return null;
    }

    // Return existing instance
    if (lenisInstance) {
        console.log('[Lenis] Returning existing instance');
        return lenisInstance;
    }

    console.log('[Lenis] Creating new instance...');

    lenisInstance = new Lenis({
        lerp: 0.15, // More responsive
        smoothWheel: true,
        wheelMultiplier: 1.5, // Faster scrolling
    });

    // Sync with ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update);

    // Native RAF
    function raf(time: number) {
        lenisInstance?.raf(time);
        rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    console.log('[Lenis] Ready!');
    return lenisInstance;
}

/**
 * Destroy Lenis instance
 */
export function destroyLenis(_lenis: Lenis | null): void {
    console.log('[Lenis] destroyLenis called (no-op for singleton)');
}

/**
 * Force cleanup
 */
export function forceDestroyLenis(): void {
    if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
    }
    if (lenisInstance) {
        lenisInstance.destroy();
        lenisInstance = null;
        console.log('[Lenis] Force destroyed');
    }
}
