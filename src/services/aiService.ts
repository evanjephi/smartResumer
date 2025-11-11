import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

export interface ResumeEnhancementRequest {
  jobDescription: string;
  currentResume: {
    summary?: string;
    skills?: string[];
    workExperience: {
      position: string;
      description: string;
      achievements: string[];
    }[];
  };
}

export const enhanceResume = async ({ jobDescription, currentResume }: ResumeEnhancementRequest) => {
  try {
    const prompt = `As an expert resume writer, enhance the following resume to better match this job description:

Job Description:
${jobDescription}

Current Resume:
${JSON.stringify(currentResume, null, 2)}

Please provide:
1. An improved professional summary
2. A list of relevant skills based on the job description and experience
3. Enhanced descriptions and achievements for each work experience entry

Response format:
{
  "summary": "enhanced summary here",
  "skills": ["skill1", "skill2", ...],
  "workExperience": [
    {
      "position": "position title",
      "description": "enhanced description",
      "achievements": ["achievement1", "achievement2", ...]
    }
  ]
}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert resume writer with years of experience in optimizing resumes for applicant tracking systems and human readers.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    if (!completion.choices[0].message?.content) {
      throw new Error('No response from OpenAI');
    }

    return JSON.parse(completion.choices[0].message.content);
  } catch (error) {
    console.error('Error enhancing resume:', error);
    throw error;
  }
};

export const generateAchievements = async (jobDescription: string, position: string) => {
  try {
    const prompt = `Based on this job position and description, suggest 3-5 strong achievement statements that could be relevant:

Position: ${position}

Job Description:
${jobDescription}

Please provide achievement statements that:
1. Start with strong action verbs
2. Include specific metrics when possible
3. Highlight relevant skills and accomplishments

Format the response as a JSON array of strings.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert resume writer who specializes in creating achievement-oriented bullet points.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    if (!completion.choices[0].message?.content) {
      throw new Error('No response from OpenAI');
    }

    return JSON.parse(completion.choices[0].message.content) as string[];
  } catch (error) {
    console.error('Error generating achievements:', error);
    throw error;
  }
};