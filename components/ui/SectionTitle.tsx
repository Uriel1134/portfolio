'use client';

interface SectionTitleProps {
    title: string;
    ghostText: string;
    align?: 'left' | 'center';
    className?: string;
}

export default function SectionTitle({
    title,
    ghostText,
    align = 'center',
    className = ''
}: SectionTitleProps) {
    const alignmentClasses = align === 'center' ? 'items-center text-center' : 'items-start text-left';

    return (
        <div className={`relative flex flex-col ${alignmentClasses} mb-12 lg:mb-16 ${className}`}>
            {/* Ghost Text (Background) */}
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl lg:text-9xl font-black text-white/[0.03] uppercase tracking-[0.2em] whitespace-nowrap select-none z-0">
                {ghostText}
            </span>

            {/* Foreground Title */}
            <div className="relative z-10 flex flex-col items-center">
                <h2 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-wider mb-4">
                    {title}
                </h2>
                <div className="h-1 w-12 bg-[#C9A84C] rounded-full"></div>
            </div>
        </div>
    );
}
