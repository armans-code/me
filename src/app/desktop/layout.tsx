/**
 * Win98 desktop alias — isolate from site theme tokens.
 */
function DesktopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="gui-shell min-h-screen bg-[#6fb5b7] text-black">
      {children}
    </div>
  );
}

export default DesktopLayout;
