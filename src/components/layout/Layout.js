const Layout = ({ children }) => {
  // const [loading, setLoading] = useState(false);

  //   if (loading) {
  //     return (
  //       <div className="w-full h-screen flex justify-center items-center">
  //         <Spinner />
  //       </div>
  //     );
  //   }

  return (
    <>
      <main>{children}</main>
      {/* <ToastContainer
        position={i18n.language === "fa" ? "top-left" : "top-right"}
        rtl={i18n.language === "fa"}
        className="!p-1 text-[0.90rem]"
      /> */}
    </>
  );
};

export default Layout;
