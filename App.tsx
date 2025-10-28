import { StatusBar } from "expo-status-bar";
import { Navigation } from "./Navegation/Navegator"; 

export default function App() {
  return (
    <>
      <Navigation /> 
      <StatusBar style="auto" />
    </>
  );
}