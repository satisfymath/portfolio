import { useEffect, useState } from 'react';

/**
 * HUD Progress Bar - shows scroll progress
 */
export function HUD() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const docHeight = document.documentElement.scrollHeight;
            const winHeight = window.innerHeight;
            const scrollTop = window.scrollY;
            const maxScroll = docHeight - winHeight;

            setProgress(maxScroll > 0 ? scrollTop / maxScroll : 0);
        };

        updateProgress();
        window.addEventListener('scroll', updateProgress, { passive: true });
        window.addEventListener('resize', updateProgress, { passive: true });

        return () => {
            window.removeEventListener('scroll', updateProgress);
            window.removeEventListener('resize', updateProgress);
        };
    }, []);

    return (
        <div className="hud-bar" role="progressbar" aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100}>
            <div
                className="hud-progress"
                style={{ transform: `scaleX(${progress})` }}
            />
        </div>
    );
}
