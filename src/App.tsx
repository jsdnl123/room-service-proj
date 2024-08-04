import { Button, Flex } from "@radix-ui/themes";
import "./App.css";
import { FilePlusIcon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/themes/src/components/context-menu.js";

function App() {
  return (
    <>
      <Label>객실 관리 프로그램</Label>
      {/* SIDE Bar: 객실 관리, 히스토리 관리 */}
      <Button color="blue">
        <FilePlusIcon />
        객실 투입
      </Button>
    </>
  );
}

export default App;
