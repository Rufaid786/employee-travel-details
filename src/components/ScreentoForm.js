import React, { useState } from "react";

import Employee from "./Employee";
import Form from "./Form";

function ScreentoForm() {
  const [updatevalue, setUpdatevalue] = useState(" ");
  return (
    <div>
      <Employee updatevalue={updatevalue} setUpdatevalue={setUpdatevalue} />
      <Form updatevalue={updatevalue} setUpdatevalue={setUpdatevalue} />
    </div>
  );
}

export default ScreentoForm;
