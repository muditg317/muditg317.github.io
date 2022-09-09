interface PageProps {

}

export function Page({children}: React.PropsWithChildren<PageProps>) {
  return (
    <div className="bg-cyan-100 min-h-full flex flex-col items-center">
      {children}
    </div>
  );
}