/**
 * Win98 GUI keeps its own palette — isolate from site theme tokens.
 */
function GuiLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="gui-shell min-h-screen bg-[#6fb5b7] text-black">
      {children}
    </div>
  );
}

export default GuiLayout;
