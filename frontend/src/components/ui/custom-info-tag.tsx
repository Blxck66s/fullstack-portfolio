function CustomInfoTag({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`bg-background flex items-center justify-center gap-1 rounded-md p-2 px-4 font-bold shadow dark:shadow-neutral-900 ${className}`}
    >
      {children}
    </span>
  );
}

export default CustomInfoTag;
