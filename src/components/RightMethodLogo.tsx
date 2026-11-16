interface RightMethodLogoProps {
  className?: string;
  variant?: 'light-on-dark' | 'dark-on-light';
}

export default function RightMethodLogo({
  className = 'h-7 w-auto',
  variant = 'light-on-dark',
}: RightMethodLogoProps) {
  const modeClass =
    variant === 'dark-on-light'
      ? 'invert mix-blend-multiply'
      : 'mix-blend-screen';

  return (
    <img
      src="/assets/aistudio/image_1d507f0b.png"
      alt="rightmethod"
      draggable={false}
      className={`object-contain select-none ${modeClass} ${className}`}
    />
  );
}
