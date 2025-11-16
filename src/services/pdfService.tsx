import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import type { Resume } from '../types';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  content: {
    fontSize: 12,
    lineHeight: 1.5,
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    fontSize: 10,
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  jobDetails: {
    fontSize: 10,
    marginBottom: 5,
  },
  achievement: {
    fontSize: 10,
    marginLeft: 10,
    marginBottom: 2,
  },
});

const ResumePDF = ({ resume }: { resume: Resume }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>{resume.personalInfo.name}</Text>
        <View style={styles.contactInfo}>
          <Text>{resume.personalInfo.email} | </Text>
          <Text>{resume.personalInfo.phone} | </Text>
          <Text>{resume.personalInfo.location}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <Text style={styles.content}>{resume.summary}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <Text style={styles.content}>{resume.skills.join(' • ')}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Work Experience</Text>
        {resume.workExperience.map((job, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.jobTitle}>{job.position} at {job.companyName}</Text>
            <Text style={styles.jobDetails}>{job.startDate} - {job.endDate}</Text>
            <Text style={styles.content}>{job.description}</Text>
            {job.achievements.map((achievement, i) => (
              <Text key={i} style={styles.achievement}>• {achievement}</Text>
            ))}
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {resume.education.map((edu, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.jobTitle}>{edu.degree}</Text>
            <Text style={styles.jobDetails}>{edu.school} | Graduated: {edu.graduationDate}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export const downloadResume = (resume: Resume) => (
  <PDFDownloadLink
    document={<ResumePDF resume={resume} />}
    fileName={`${resume.personalInfo.name.replace(/\s+/g, '-')}-Resume.pdf`}
  >
    {({ loading }) =>
      loading ? 'Generating PDF...' : 'Download PDF'
    }
  </PDFDownloadLink>
);