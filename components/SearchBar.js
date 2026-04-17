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

      {search && (
        <ClearButton onClick={handleClear} aria-label="Clear search">
          X
        </ClearButton>
      )}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 44px 14px 14px;
  border-radius: 12px;
  border: 1px solid #ddd;
  background: white;
  font-size: 1rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04);
  &:focus {
    outline: none;
    border-color: #999;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  font-size: 1.2rem;
  cursor: pointer;
  color: #666;
  &:hover {
    color: #111;
  }
`;
