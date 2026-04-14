import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { statusColors } from "@/utils/statusColors";

export default function ProjectCard({ project }) {
  return (
    <Article>
      <ImageWrapper>
        <Image
          src={project.imageUrl || "/placeholder.jpg"}
          alt={`Image of ${project.title}`}
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
  transition:
    transform 0.15s ease-out,
    box-shadow 0.15s ease-out;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
`;

const Content = styled.div`
  padding: 0 10px;
`;

const H2 = styled.h2`
  font-size: 1rem;
  margin-bottom: 8px;
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
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #666;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  font-size: 1.1rem;
  font-weight: bold;
  text-decoration: none;
  color: #111;
  position: relative;
  cursor: pointer;
  transition: color 0.15s ease-out;
  &:hover {
    color: #0070f3;
  }
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 0%;
    height: 2px;
    background: #0070f3;
    transition: width 0.2s ease-out;
  }
  &:hover::after {
    width: 100%;
  }
`;
