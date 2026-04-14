import styled from "styled-components";

export default function SearchBar({ search, setSearch }) {
  function handleChange(event) {
    setSearch(event.target.value);
  }
  function handleClear() {
    setSearch("");
  }
  return (
    <Wrapper>
      <Input
        type="text"
        placeholder="Search Projects..."
        value={search}
        onChange={handleChange}
      />

      {search && <ClearButton onClick={handleClear}>X</ClearButton>}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 40px 10px 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const ClearButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  font-size: 1.2rem;
  cursor: pointer;
`;
