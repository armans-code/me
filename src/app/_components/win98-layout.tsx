/**
 * Win98 layout — isolate from site theme tokens.
 */
function Win98Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="gui-shell min-h-screen bg-[#6fb5b7] text-black">
      {children}
    </div>
  );
}

export default Win98Layout;
