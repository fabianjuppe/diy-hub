import Image from "next/image";
import styled from "styled-components";

export default function ProjectInfo({
  title,
  imageUrl,
  category,
  duration,
  complexity,
  description,
}) {
  return (
    <Wrapper>
      <ImageWrapper>
      {/* TODO IMAGE SIZE ANPASSEN  */}
      <Image src={imageUrl} alt={title} fill style={{objectFit: "cover"}}></Image>
      </ImageWrapper>
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

