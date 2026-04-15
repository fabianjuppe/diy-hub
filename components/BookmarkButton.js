import styled from "styled-components";

const StyledButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 20px;

  &:hover {
    transform: scale(1.2);
  }
`;

export default function BookmarkButton({ onClick, ariaLabel, isBookmarked }) {
  return (
    <StyledButton
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={isBookmarked}
    >
      {isBookmarked ? "❤️" : "🤍"}
    </StyledButton>
  );
}
