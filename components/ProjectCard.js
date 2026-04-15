import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { statusColors } from "@/utils/statusColors";

export default function ProjectCard({ project }) {
  const imageSrc = project.imageUrl?.[0] || "/placeholder.jpg";
  return (
    <Article>
      <ImageWrapper>
        <Image
          src={imageSrc}
          alt={project.title || "project"}
          fill
          style={{ objectFit: "cover" }}
        />
      </ImageWrapper>

      <Content>
        <StyledLink href={`/projects/${project._id}`}>
          <H2>{project.title}</H2>
        </StyledLink>

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
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
`;

const Content = styled.div`
  padding: 10px;
`;

const H2 = styled.h2`
  font-size: 1rem;
`;

const StyledStatus = styled.p`
  color: ${({ $status }) => statusColors[$status]};
  text-align: center;
  width: 30%;
  padding: 2px;
  background-color: ${({ $status }) => statusColors[$status] + "20"};
  border: 1px solid ${({ $status }) => statusColors[$status]};
  border-radius: 8px;
`;

const P = styled.p`
  font-size: 0.85rem;
  color: #666;
`;

const StyledLink = styled(Link)`
  font-weight: bold;
  text-decoration: none;
  color: black;
`;
