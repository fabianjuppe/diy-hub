import Link from "next/link";
import styled from "styled-components";

export default function BackButton() {
  return <StyledLink href="/">back</StyledLink>;
}
const StyledLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;

  padding: 8px 14px;
  border-radius: 8px;

  background: #f1f3f5;
  color: #111;
  text-decoration: none;
  font-weight: 500;

  transition: all 0.15s ease;

  &:hover {
    background: #e9ecef;
    transform: translateY(-1px);
  }
`;