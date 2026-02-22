'use client';

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from '@react-pdf/renderer';
import FormData from '@/types/FormInput';

// Register a font if possible, otherwise use standard fonts
// Font.register({ family: 'Open Sans', src: '...' });

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  leftColumn: {
    width: '35%',
    height: '100%',
    backgroundColor: '#1e293b', // Slate-800
    color: '#f8fafc', // Slate-50
    padding: 24,
  },
  rightColumn: {
    width: '65%',
    height: '100%',
    padding: 24,
    backgroundColor: '#FFFFFF',
    color: '#0f172a', // Slate-900
  },
  
  // Left Column Styles
  leftTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#94a3b8', // Slate-400
    marginBottom: 8,
    marginTop: 20,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    borderBottom: '1px solid #475569',
    paddingBottom: 4,
  },
  leftText: {
    fontSize: 10,
    marginBottom: 4,
    lineHeight: 1.4,
    color: '#e2e8f0', // Slate-200
  },
  leftHeading: {
     fontSize: 12,
     fontWeight: 'bold',
     color: '#ffffff',
     marginBottom: 2,
     marginTop: 6
  },
  skillItem: {
    fontSize: 10,
    marginBottom: 4,
    color: '#f1f5f9',
    backgroundColor: '#334155',
    padding: '4 8',
    borderRadius: 4,
    textAlign: 'center',
  },

  // Right Column Styles
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0f172a',
    textTransform: 'uppercase',
    marginBottom: 4,
    letterSpacing: 1,
  },
  jobTitle: {
    fontSize: 14,
    color: '#64748b', // Slate-500
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3b82f6', // Blue-500
    marginBottom: 10,
    marginTop: 15,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: 4,
  },
  bodyText: {
    fontSize: 10,
    lineHeight: 1.6,
    marginBottom: 8,
    textAlign: 'justify',
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  jobRole: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  jobCompany: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#64748b',
  },
  jobDate: {
    fontSize: 10,
    color: '#94a3b8',
  },
  bulletPoint: {
      flexDirection: 'row',
      marginBottom: 3,
  },
  bullet: {
      width: 10,
      fontSize: 10,
      color: '#3b82f6',
  }
});

const ResumeDocument = ({ dataProp }: { dataProp: FormData }) => {
    // Normalize data
    const skills = Array.isArray(dataProp.singleSkills) 
        ? dataProp.singleSkills 
        : typeof dataProp.singleSkills === 'string' 
            ? (dataProp.singleSkills as string).split(',') 
            : [];
            
    const jobSummaries = Array.isArray(dataProp.job_summary) 
        ? dataProp.job_summary 
        : typeof dataProp.job_summary === 'string' 
            ? [dataProp.job_summary] 
            : [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* LEFT COLUMN */}
        <View style={styles.leftColumn}>
          
          <View>
            <Text style={styles.leftTitle}>Contact</Text>
            {dataProp.number && <Text style={styles.leftText}>{dataProp.number}</Text>}
            {dataProp.email && <Text style={styles.leftText}>{dataProp.email}</Text>}
            {dataProp.address && <Text style={styles.leftText}>{dataProp.address}</Text>}
          </View>

          <View>
            <Text style={styles.leftTitle}>Education</Text>
            <Text style={styles.leftHeading}>{dataProp.degName}</Text>
            <Text style={styles.leftText}>{dataProp.university}</Text>
            <Text style={styles.leftText}>{dataProp.educationYear}</Text>
          </View>

          <View>
            <Text style={styles.leftTitle}>Skills</Text>
            <View style={{ gap: 4 }}>
                {skills.map((skill, i) => (
                    <Text key={i} style={styles.skillItem}>{skill.trim()}</Text>
                ))}
            </View>
          </View>

        </View>

        {/* RIGHT COLUMN */}
        <View style={styles.rightColumn}>
          <Text style={styles.name}>{dataProp.name}</Text>
          <Text style={styles.jobTitle}>{dataProp.position}</Text>

          <View>
            <Text style={styles.sectionTitle}>Professional Profile</Text>
            <Text style={styles.bodyText}>
              {dataProp.education_summary || "Driven professional with a passion for excellence in the field."}
            </Text>
          </View>

          <View>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            
            <View>
                <View style={styles.jobHeader}>
                    <View>
                         <Text style={styles.jobRole}>{dataProp.position}</Text>
                         <Text style={styles.jobCompany}>{dataProp.company}</Text>
                    </View>
                    <Text style={styles.jobDate}>{dataProp.time}</Text>
                </View>
                
                {dataProp.jobDescription && (
                    <Text style={styles.bodyText}>{dataProp.jobDescription}</Text>
                )}

                {/* API Generated Bullet Points */}
                 {jobSummaries.length > 0 && (
                     <View style={{ marginTop: 4 }}>
                         {jobSummaries.map((summary: string, i: number) => (
                             <View key={i} style={styles.bulletPoint}>
                                 <Text style={styles.bullet}>•</Text>
                                 <Text style={styles.bodyText}>{summary}</Text>
                             </View>
                         ))}
                     </View>
                 )}
            </View>

          </View>

        </View>

      </Page>
    </Document>
  );
};

export default ResumeDocument;
