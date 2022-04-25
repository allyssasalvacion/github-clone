import React from "react";

import Header from "./Header";

function Container({ children }) {
  return (
    <main>
      <Header />
      <div>{children}</div>
      {/* <Footer /> */}
    </main>
  );
}

export default Container;
