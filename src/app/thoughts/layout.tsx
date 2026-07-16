function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-12 w-full flex flex-col justify-center items-center">
      {children}
    </div>
  );
}

export default Layout;
