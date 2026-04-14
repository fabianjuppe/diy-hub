import Image from "next/image";
import styled from "styled-components";
import { useState } from "react";

export default function ProjectInfo({
  title,
  imageUrl,
  category,
  duration,
  complexity,
  description,
}) {
  const [imageBoxIndex, setImageBoxIndex] = useState(null);

  //verschachtelter ternary operator: Welches Bild soll CoverImage werden? Nimm das erste Bild, wenn mehrere da sind, sonst nimm das Bild, wenn es gültig ist, sonst nimm ein Standardbild
  const coverImage = Array.isArray(imageUrl)
    ? imageUrl[0]
    : imageUrl?.startsWith("http") || imageUrl?.startsWitch("/")
      ? imageUrl
      : "/placeholder.jpg";

  return (
    <Wrapper>
      <ImageWrapper>
        <Image
          src={coverImage}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
        ></Image>
      </ImageWrapper>
      {Array.isArray(imageUrl) && imageUrl.length > 1 && (
        <StyledGalleryRow>
          {imageUrl.map((src, i) => (
            <StyledGalleryThumb key={i} onClick={() => setImageBoxIndex(i)}>
              <Image
                src={src}
                alt={`${title} ${i + 1}`}
                fill
                style={{ objectFit: "cover" }}
              />
            </StyledGalleryThumb>
          ))}
        </StyledGalleryRow>
      )}

      {imageBoxIndex !== null && (
        <Overlay onClick={() => setImageBoxIndex(null)}>
          {" "}
          <ImageBoxBox onClick={(e) => e.stopPropagation()}>
            {" "}
            <ImageBoxImage
              src={imageUrl[imageBoxIndex]}
              alt={`${title} ${imageBoxIndex + 1}`}
              fill
              style={{ objectFit: "contain" }}
            />{" "}
            <NavButton
              left
              onClick={() =>
                setImageBoxIndex(
                  (i) => (i - 1 + imageUrl.length) % imageUrl.length
                )
              }
            >
              ‹
            </NavButton>{" "}
            <NavButton
              onClick={() => setImageBoxIndex((i) => (i + 1) % imageUrl.length)}
            >
              ›
            </NavButton>{" "}
            <CloseButton onClick={() => setImageBoxIndex(null)}>
              ✕
            </CloseButton>{" "}
          </ImageBoxBox>{" "}
        </Overlay>
      )}
      <Content>
        <Title>{title}</Title>
        <Infos>
          <Tag>Category: {category}</Tag>
          <Tag>Duration: {duration}</Tag>
          <Tag>Complexity: {complexity}</Tag>
        </Infos>
        <Description>{description}</Description>
      </Content>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  margin-bottom: 20px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 320px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 15px;
`;

const StyledGalleryRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
  flex-wrap: wrap;
`;

const StyledGalleryThumb = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
  cursor: pointer;
  transition: opacity 0.15s ease;
  &:hover {
    opacity: 0.8;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ImageBoxBox = styled.div`
  position: relative;
  width: 90vw;
  max-width: 900px;
  height: 80vh;
`;
const ImageBoxImage = styled(Image)``;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) =>
    props.left
      ? "left: -48px;"
      : "right: -48px;"} background: rgba(255,255,255,0.15);
  border: none;
  color: white;
  font-size: 2rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;
const CloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const Content = styled.div`
  padding: 0 5px;
`;

const Title = styled.h2`
  margin-bottom: 10px;
`;

const Infos = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 15px;
`;

const Tag = styled.span`
  background: #eee;
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 0.8rem;
`;

const Description = styled.p`
  line-height: 1.5;
`;
