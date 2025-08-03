'use client';
import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from '@react-pdf/renderer';

// Manual styles (no Tailwind)
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    fontSize: 11,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  leftColumn: {
    width: '33%',
    backgroundColor: '#eaf3f8',
    color: '#3a3f44',
    padding: 10,
    gap: 12,
  },
  rightColumn: {
    width: '67%',
    padding: 10,
    color: '#333',
    gap: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0f4c81',
    marginBottom: 6,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f4c81',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  listItem: {
    marginLeft: 10,
    marginBottom: 2,
  },
});

const ResumeDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Left Column */}
      <View style={styles.leftColumn}>
        <View>
          <Text style={styles.sectionTitle}>CONTACT</Text>
          <Text>Phone: (123) 456-7890</Text>
          <Text>Email: andrea@example.com</Text>
          <Text>LinkedIn: linkedin.com/in/andrea-martinez</Text>
        </View>

        <View>
          <Text style={styles.sectionTitle}>EDUCATION</Text>
          <Text>Bachelor of Arts</Text>
          <Text>Visual Communication Design</Text>
          <Text>Ringling College of Art and Design</Text>
          <Text>Sarasota, FL</Text>
          <Text>Honors: cum laude (GPA: 3.4/4.0)</Text>
          <Text>June 2023</Text>
        </View>

        <View>
          <Text style={styles.sectionTitle}>ADDITIONAL SKILLS</Text>
          <Text style={styles.listItem}>• ADOBE ILLUSTRATOR</Text>
          <Text style={styles.listItem}>• ADOBE INDESIGN</Text>
          <Text style={styles.listItem}>• DIGITAL THEORY</Text>
          <Text style={styles.listItem}>• VIDEO & PRINT PRODUCTION</Text>
          <Text style={styles.listItem}>• COLLABORATION</Text>
          <Text style={styles.listItem}>• TIME MANAGEMENT</Text>
        </View>
      </View>

      {/* Right Column */}
      <View style={styles.rightColumn}>
        <Text style={styles.heading}>ANDREA MARTINEZ</Text>
        <Text>Example by Resume Genius</Text>

        <View>
          <Text style={styles.sectionTitle}>SUMMARY</Text>
          <Text>
            Creative and detail-oriented graphic designer with a strong
            foundation in visual communication and branding. Experienced in
            designing print and digital materials that engage and convert.
          </Text>
        </View>

        <View>
          <Text style={styles.sectionTitle}>RELEVANT EXPERIENCE</Text>

          <View>
            <Text>Graphic Design Volunteer</Text>
            <Text>Cat Depot, Sarasota, FL</Text>
            <Text>December 2022 – Present</Text>
            <Text style={styles.listItem}>• Used Adobe Creative Suite to enhance branding materials.</Text>
            <Text style={styles.listItem}>• Designed marketing assets that increased adoption inquiries by 30%.</Text>
            <Text style={styles.listItem}>• Created visuals for monthly newsletters.</Text>
            <Text style={styles.listItem}>• Collaborated on event posters and banners.</Text>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text>Graphic Design Intern</Text>
            <Text>Sann, Sarasota, FL</Text>
            <Text>May 2022 – November 2022</Text>
            <Text style={styles.listItem}>• Created social media and ad assets.</Text>
            <Text style={styles.listItem}>• Helped redesign the company website.</Text>
            <Text style={styles.listItem}>• Produced print materials for launches.</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default ResumeDocument;
