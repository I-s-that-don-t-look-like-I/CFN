import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { GiTakeMyMoney, GiPresent } from "react-icons/gi";
import { BiTrendingDown } from "react-icons/bi";

function StatsCard(props) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      border={"3px solid"}
      borderColor={useColorModeValue("orange.400", "orange.400")}
      rounded={"lg"}
    >
      <Flex justifyContent={"space-around"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontSize={"lg"} fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={"auto"}
          color={useColorModeValue("gray.800", "gray.200")}
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function BasicStatistics() {
  return (
    <Flex
      direction={"column"}
      px={{ base: 2, sm: 12, md: 17 }}
      justify={"center"}
      align={"center"}
      h={"100vh"}
      pos={"relative"}
    >
      <Box
        w={"60%"}
        h={"25%"}
        bgGradient={"linear(to-b,white,orange.300)"}
        pos={"absolute"}
        zIndex={-3}
        filter={"blur(150px)"}
      ></Box>
      <chakra.h1
        textAlign={"center"}
        fontSize={"5xl"}
        py={10}
        fontWeight={"bold"}
      >
        <Text
          bgGradient={"linear(to-r, orange.500, green.400)"}
          bgClip={"text"}
          as={"span"}
        >
          Crowdfunding Film with NFT
        </Text>
      </chakra.h1>
      <SimpleGrid columns={{ base: 2, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          title={"독립영화 제작 비용"}
          stat={"크라우드 펀딩"}
          icon={<GiTakeMyMoney size={"5em"} />}
        />
        <StatsCard
          title={"리워드"}
          stat={"NFT"}
          icon={<GiPresent size={"5em"} />}
        />
        <StatsCard
          title={"블록체인"}
          stat={"투명성 보장으로 리스크 감소"}
          icon={<BiTrendingDown size={"5em"} />}
        />
      </SimpleGrid>
    </Flex>
  );
}
