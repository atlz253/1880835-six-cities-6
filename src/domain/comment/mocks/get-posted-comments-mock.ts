import { getUserMock } from '../../user/mocks/get-user-mock';
import { PostedComment } from '../types';

export function getPostedCommentsMock(): PostedComment[] {
  return [
    {
      id: 0,
      date: '12-11-2025',
      comment:
        'This service exceeded my expectations in every way. I will definitely use it again!',
      rating: 5,
      user: getUserMock(),
    },
    {
      id: 1,
      date: '15-11-2025',
      comment:
        'The experience was decent overall, but there are definitely areas that could be improved.',
      rating: 3,
      user: getUserMock(),
    },
    {
      id: 2,
      date: '16-11-2025',
      comment:
        'Fast, reliable, and user-friendly interface. I highly recommend this to anyone looking for quality!',
      rating: 5,
      user: getUserMock(),
    },
    {
      id: 3,
      date: '17-11-2025',
      comment:
        'It was an average experience—not bad, but nothing particularly impressive either.',
      rating: 3,
      user: getUserMock(),
    },
    {
      id: 4,
      date: '18-11-2025',
      comment:
        'I am extremely satisfied with the support and the overall quality of the service provided.',
      rating: 5,
      user: getUserMock(),
    },
    {
      id: 5,
      date: '19-11-2025',
      comment:
        'Unfortunately, the product did not meet the standards I was hoping for. Quite disappointing.',
      rating: 2,
      user: getUserMock(),
    },
    {
      id: 6,
      date: '20-11-2025',
      comment:
        'Everything worked smoothly and as expected. No issues at all during the entire process.',
      rating: 4,
      user: getUserMock(),
    },
    {
      id: 7,
      date: '21-11-2025',
      comment:
        'Great value for money! The features offered are well worth the price you pay for them.',
      rating: 4,
      user: getUserMock(),
    },
    {
      id: 8,
      date: '22-11-2025',
      comment:
        'The UI is clean and intuitive, and customer support responded quickly to my questions.',
      rating: 5,
      user: getUserMock(),
    },
    {
      id: 9,
      date: '23-11-2025',
      comment:
        'There was a minor bug at first, but the team fixed it within hours. Very impressed!',
      rating: 4,
      user: getUserMock(),
    },
    {
      id: 10,
      date: '24-11-2025',
      comment:
        'Absolutely fantastic experience from start to finish. I will be coming back for sure!',
      rating: 5,
      user: getUserMock(),
    },
    {
      id: 11,
      date: '25-11-2025',
      comment:
        'Nothing extraordinary, but it does what it promises without any major problems.',
      rating: 3,
      user: getUserMock(),
    },
  ];
}
