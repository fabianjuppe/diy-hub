import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { statusColors } from "@/utils/statusColors";
import BookmarkButton from "./BookmarkButton";

export default function ProjectCard({ project, bookmarks, toggleBookmark }) {
  const imageSrc = project.imageUrl?.[0] || "/placeholder.jpg";
  return (
    <Article>
      <StyledLink href={`/projects/${project._id}`}>
        <ImageWrapper>
          <Image
            src={imageSrc}
            alt={project.title || "project"}
            fill
            style={{ objectFit: "cover" }}
          />
        </ImageWrapper>
      </StyledLink>

      <Content>
        <TopRow>
          <StyledLink href={`/projects/${project._id}`}>
            <H2>{project.title}</H2>
          </StyledLink>

          <BookmarkButton
            onClick={() => {
              event.stopPropagation();
              toggleBookmark(project._id);
            }}
            ariaLabel={
              bookmarks.includes(project._id)
                ? "Remove from bookmarks"
                : "Add to bookmarks"
            }
            isBookmarked={bookmarks.includes(project._id)}
          />
        </TopRow>

        <StyledStatus $status={project.status}>{project.status}</StyledStatus>

        <P>
          <strong>Complexity:</strong> {project.complexity}
        </P>

        <P>
          <strong>Duration:</strong> {project.duration}
        </P>
      </Content>
    </Article>
  );
}

const Article = styled.article`
  background: white;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transition: transform 0.18s ease box-shadow 0.18s ease;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.12);
  }
  &:hover h2 {
    color: #0070f3;
    transform: translateX(2px);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
`;

const Content = styled.div`
  padding: 16px;
`;

const H2 = styled.h2`
  font-size: 1.15rem;
  margin: 0;
  padding: 10px;
  transition: all 0.18s ease;
`;

const StyledStatus = styled.p`
  display: inline-block;
  margin: 14px 0 12px;
  color: ${({ $status }) => statusColors[$status]};
  padding: 4px 10px;
  background-color: ${({ $status }) => statusColors[$status] + "20"};
  border: 1px solid ${({ $status }) => statusColors[$status]};
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
`;

const P = styled.p`
  font-size: 0.92rem;
  color: #555;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #111;
  &:hover ${H2} {
    color: #0070f3;
    transform: translateX(2px);
  }
`;
const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
`;
