import styled from "styled-components";
import BookmarkButton from "./BookmarkButton";

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

export default function Filter({ filters, setFilters, setSearch }) {
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
      bookmarked: false,
    };
    setSearch("");
    setFilters(reset);
    localStorage.removeItem("filters");
    localStorage.removeItem("search");
  }

  return (
    <Wrapper>
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

      <BookmarkButton
        onClick={() =>
          setFilters((prev) => ({
            ...prev,
            bookmarked: !prev.bookmarked,
          }))
        }
        ariaLabel={
          filters.bookmarked
            ? "Disable bookmark filter"
            : "Show only bookmarked projects"
        }
        isBookmarked={filters.bookmarked}
      />

      <ResetButton type="button" onClick={handleReset}>
        Reset Filters
      </ResetButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin: 10px;
`;

const StyledSelect = styled.select`
  min-width: 170px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid #ddd;
  background: white;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04);
  &:focus {
    outline: none;
    border-color: #999;
  }
`;

const ResetButton = styled.button`
  padding: 12px 16px;
  border: none;
  border-radius: 12px;
  background: #111;
  color: white;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background: #2d2d2d;
  }
`;
