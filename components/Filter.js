import styled from "styled-components";

const categoryOptions = [
  "Woodworking",
  "Electronics",
  "Crafts",
  "Home Improvement",
  "Garden",
  "Upcycling",
];

const complexityOptions = ["Beginner", "Intermediate", "Advanced"];

const durationOptions = [
  "1 hour",
  "2 hours",
  "3 hours",
  "4 hours",
  "6 hours",
  "1 day",
  "2 days",
];

export default function Filter({ filters, setFilters }) {
  function handleChange(event) {
    const { name, value } = event.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleReset() {
    const reset = {
      category: "",
      complexity: "",
      duration: "",
      search: "",
    };
    setFilters(reset);
    localStorage.removeItem("filters");
  }

  return (
    <Wrapper>
      <input
        type="text"
        placeholder="Search..."
        name="search"
        value={filters.search}
        onChange={handleChange}
      />

      <StyledSelect
        name="category"
        value={filters.category}
        onChange={handleChange}
      >
        <option value="">All Categories</option>
        {categoryOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </StyledSelect>

      <StyledSelect
        name="complexity"
        value={filters.complexity}
        onChange={handleChange}
      >
        <option value="">All Complexity</option>
        {complexityOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </StyledSelect>

      <StyledSelect
        name="duration"
        value={filters.duration}
        onChange={handleChange}
      >
        <option value="">All Durations</option>
        {durationOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </StyledSelect>

      <ResetButton type="button" onClick={handleReset}>
        Reset Filters
      </ResetButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const StyledSelect = styled.select`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: white;
`;

const ResetButton = styled.button`
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  background: black;
  color: white;
  cursor: pointer;
  &:hover {
    background: #333;
  }
`;
