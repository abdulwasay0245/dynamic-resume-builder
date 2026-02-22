import React from "react";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet
} from "@react-pdf/renderer";

// Create styles similar to Tailwind
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#f7fafc", // gray-100
    fontFamily: "Helvetica",
    padding: 20,
    color: "#2d3748" // gray-800
  },
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    boxShadow: "0 0 5px rgba(0,0,0,0.1)"
  },
  header: {
    textAlign: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#cbd5e0", // gray-400
    paddingBottom: 10,
    marginBottom: 20
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e40af", // blue-800
    marginBottom: 4
  },
  contact: {
    fontSize: 10,
    color: "#4a5568" // gray-600
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#1e40af",
    marginBottom: 6
  },
  paragraph: {
    fontSize: 10,
    color: "#4a5568",
    lineHeight: 1.4,
    textAlign: "justify"
  },
  job: {
    borderLeftWidth: 2,
    borderLeftColor: "#cbd5e0",
    paddingLeft: 8,
    marginBottom: 10
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  jobTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1e40af"
  },
  jobDate: {
    fontSize: 9,
    fontStyle: "italic",
    color: "#4a5568"
  },
  jobDesc: {
    fontSize: 9,
    color: "#4a5568",
    marginBottom: 4
  },
  listItem: {
    fontSize: 9,
    color: "#4a5568",
    marginBottom: 2
  },
  degree: {
    borderLeftWidth: 2,
    borderLeftColor: "#cbd5e0",
    paddingLeft: 8,
    marginBottom: 8
  },
  degreeTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1e40af"
  },
  degreeSubtitle: {
    fontSize: 9,
    color: "#4a5568"
  },
  degreeDate: {
    fontSize: 9,
    fontStyle: "italic",
    color: "#4a5568"
  },
  skillSection: {
    flexDirection: "row",
    gap: 20
  },
  skillCategory: {
    flex: 1
  },
  skillCategoryTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1e40af",
    marginBottom: 4
  }
});

const ResumePDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>OLIVIA WILSON</Text>
          <Text style={styles.contact}>
            oliviawilson@gmail.com | +1 555-123-4567 | 123 Main Street Rd., Any City
          </Text>
          <Text style={styles.contact}>
            www.linkedin.com/in/oliviawilson
          </Text>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.paragraph}>
            Detail-oriented administrative professional with over three years of experience
            supporting executive leadership through project coordination and client relations.
            Proven track record in strategic partnership development, event management, and
            cross-functional collaboration. Adept at managing multiple priorities in fast-paced
            environments while maintaining exceptional attention to detail and delivering superior
            customer service. Seeking to contribute strong analytical and business acumen skills.
          </Text>
        </View>

        {/* Work Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>

          {/* Job 1 */}
          <View style={styles.job}>
            <View style={styles.jobHeader}>
              <Text style={styles.jobTitle}>Administrative Assistant</Text>
              <Text style={styles.jobDate}>Apr 2021 - Present</Text>
            </View>
            <Text style={styles.jobDesc}>
              Managed executive calendars, enhance meetings, and coordinate travel arrangements
            </Text>
            <Text style={styles.listItem}>
              • Provided comprehensive administrative support to senior leadership team
            </Text>
            <Text style={styles.listItem}>
              • Maintained filing systems and databases for improved organizational efficiency
            </Text>
            <Text style={styles.listItem}>
              • Processed in managing company events, ensuring maximum attendance
            </Text>
          </View>

          {/* Job 2 */}
          <View style={styles.job}>
            <View style={styles.jobHeader}>
              <Text style={styles.jobTitle}>Customer Service Representative</Text>
              <Text style={styles.jobDate}>Jun 2019 - Mar 2021</Text>
            </View>
            <Text style={styles.jobDesc}>Retail Company</Text>
            <Text style={styles.listItem}>
              • Assisted customers with inquiries, returns, and product information
            </Text>
            <Text style={styles.listItem}>
              • Worked as a Sales/Customer Representative, ensuring effective communication and customer satisfaction
            </Text>
            <Text style={styles.listItem}>
              • Collaborated with team members to achieve store goals and improve customer service standards
            </Text>
          </View>

          {/* Job 3 */}
          <View style={styles.job}>
            <View style={styles.jobHeader}>
              <Text style={styles.jobTitle}>Intern - Sales and Communication</Text>
              <Text style={styles.jobDate}>Jun 2018 - Dec 2018</Text>
            </View>
            <Text style={styles.jobDesc}>
              Supported daily office operations, maintained organized sales records and databases, and improved communication between departments
            </Text>
            <Text style={styles.listItem}>
              • Assisted in the planning and execution of corporate events and client communications
            </Text>
            <Text style={styles.listItem}>
              • Gained valuable experience in the field of communication and interaction with customers
            </Text>
          </View>
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>

          <View style={styles.degree}>
            <Text style={styles.degreeTitle}>Bachelor of Business Administration</Text>
            <Text style={styles.degreeSubtitle}>Business Management</Text>
            <Text style={styles.degreeDate}>Jan 2020 - Feb 2021</Text>
          </View>

          <View style={styles.degree}>
            <Text style={styles.degreeTitle}>Foundation in Business Administration</Text>
            <Text style={styles.degreeSubtitle}>Business Foundation</Text>
            <Text style={styles.degreeDate}>Jan 2018 - Dec 2019</Text>
          </View>
        </View>

        {/* Key Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Skills</Text>
          <View style={styles.skillSection}>
            {/* Technical Skills */}
            <View style={styles.skillCategory}>
              <Text style={styles.skillCategoryTitle}>Technical Skills</Text>
              <Text style={styles.listItem}>• MS Office Suite</Text>
              <Text style={styles.listItem}>• Database Management</Text>
              <Text style={styles.listItem}>• Data Entry</Text>
              <Text style={styles.listItem}>• Organizational Skills</Text>
              <Text style={styles.listItem}>• Advanced Communication</Text>
            </View>

            {/* Professional Skills */}
            <View style={styles.skillCategory}>
              <Text style={styles.skillCategoryTitle}>Professional Skills</Text>
              <Text style={styles.listItem}>• Problem Solving</Text>
              <Text style={styles.listItem}>• Time Management</Text>
              <Text style={styles.listItem}>• Customer Service</Text>
              <Text style={styles.listItem}>• Event Planning</Text>
              <Text style={styles.listItem}>• Fluent in English and Mandarin</Text>
            </View>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default ResumePDF;
