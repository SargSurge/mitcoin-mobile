import React from "react";
import { StyleSheet, View } from "react-native";
import { Content, Text } from "native-base";
import AboutCard from "./aboutCard.js";

export default class TheTeam extends React.Component {
  render() {
    craig_body = (
      <View>
        <Text style={styles.cardItemList}>POSCO</Text>
        <Text style={styles.cardItemList}>
          Professor of Materials Science and Engineering
        </Text>
        <Text style={styles.cardItemList}>MacVicar Fellow</Text>
        <Text style={styles.cardItemList}>MITcoin Creator</Text>
        <Text style={styles.email}>ccarter@mit.edu</Text>
      </View>
    );

    mary_body = (
      <View>
        <Text style={styles.cardItemList}>Graduate Student</Text>
        <Text style={styles.cardItemList}>
          Department of Materials Science and Engineering
        </Text>
        <Text style={styles.email}>mbwagner@mit.edu</Text>
      </View>
    );

    maisie_body = (
      <View>
        <Text style={styles.cardItemList}>
          Communications and Community Engagement Manager at MindHandHeart
        </Text>

        <Text style={styles.email}>maisieob@mit.edu</Text>
      </View>
    );
    issac_body = (
      <View>
        <Text style={styles.cardItemList}>Web Developer</Text>

        <Text style={styles.cardItemList}>EECS</Text>
        <Text style={styles.email}>iredlon@mit.edu</Text>
      </View>
    );

    timmy_body = <Text style={styles.email}>mitimmy@mit.edu</Text>;
    brian_body = (
      <View>
        <Text style={styles.cardItemList}>Software Developer</Text>

        <Text style={styles.cardItemList}>EECS</Text>
        <Text style={styles.email}>bntanga@mit.edu</Text>
      </View>
    );

    let teamMembers = [
      <AboutCard title="W. Craig Carter" body={craig_body} key="craig" />,
      <AboutCard title="Mary Beth Wagner" body={mary_body} key="marybeth" />,
      <AboutCard title="Maisie O'Brien" body={maisie_body} key="maisie" />,
      <AboutCard title="Issac Redlon" body={issac_body} key="issac" />,
      <AboutCard title="Timmy Xiao" body={timmy_body} key="timmy" />,
      <AboutCard title="Brian Ntanga" body={brian_body} key="brian" />,
    ];

    teamMembers.sort(() => Math.random() - 0.5);

    return <Content style={styles.container}>{teamMembers}</Content>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  cardItemList: {
    paddingTop: 0,
    paddingBottom: 5,
  },
  email: {
    fontWeight: "600",
    paddingTop: 8,

    ...Platform.select({
      android: {
        fontWeight: "bold",
        color: "#3B4049",
      },
    }),
  },
});
