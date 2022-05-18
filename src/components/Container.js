import React from "react";

import Header from "./Header";

function Container({ children }) {
  return (
    <main className="min-w-[40rem]">
      <Header />
      <div>{children}</div>
      {/* <Footer /> */}
    </main>
  );
}

export default Container;
