export interface Question {
  question_id: number;
  title: string;
  link: string;
  body: string; 
  tags: string[]; 
  answer_count: number;
  creation_date: number;
  owner: {
    display_name: string;
    link: string;
    profile_image: string;
  };
}

export interface Answer {
  answer_id: number;
  body: string;
  is_accepted: boolean;
  score: number;
  creation_date: number;
  owner: {
    display_name: string;
    link: string;
    profile_image: string;
  };
}

export interface SearchResultsProps {
  items: Question[];
  total: number;
}