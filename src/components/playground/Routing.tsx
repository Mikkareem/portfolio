import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

export function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="details" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  const navigate = useNavigate();

  return (
    <mesh onClick={() => navigate("details")}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color={"red"} />
    </mesh>
  );
}

function Details() {
  const navigate = useNavigate();

  return (
    <mesh onClick={() => navigate(-1)}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color={"blue"} />
    </mesh>
  );
}
