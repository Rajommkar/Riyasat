import { Box, Typography, Card, CardContent, Avatar, Rating, Grid, Stack } from '@mui/material';

const reviewsData = [
  {
    id: 1,
    name: "Jonathan Harker",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    date: "12 Oct 2023",
    property: "Luxury Villa in Beverly Hills",
    text: "Absolutely stunning service. The property was exactly as described and the agent went above and beyond to make the closing process seamless. Highly recommended!"
  },
  {
    id: 2,
    name: "Samantha Brooks",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    date: "04 Nov 2023",
    property: "Modern Penthouse NYC",
    text: "The views from this penthouse are breathtaking. The Yariga team is highly professional and made sure all our custom requests were met before move-in."
  },
  {
    id: 3,
    name: "Marcus Aurelius",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    rating: 4.5,
    date: "18 Nov 2023",
    property: "Suburban Home Estate",
    text: "A very solid experience overall. The virtual tours were highly accurate. Minor delay in some paperwork, but the agent was communicative throughout the process."
  },
  {
    id: 4,
    name: "Eleanor Rigby",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    date: "22 Dec 2023",
    property: "Cozy Beachfront Condo",
    text: "We bought our dream vacation home through this platform. The luxury gallery truly captured the essence of the home, but seeing it in person was even better."
  },
  {
    id: 5,
    name: "Alexander Pierce",
    avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    date: "05 Jan 2024",
    property: "Downtown Commercial Loft",
    text: "Fantastic commercial real estate options. We needed a creative studio space and the agent found us the perfect loft with incredible natural light."
  },
  {
    id: 6,
    name: "Olivia Spencer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    date: "14 Feb 2024",
    property: "Lakeside Cabin Retreat",
    text: "This was my first time buying a second home and I was nervous, but the support from the Yariga team was incredible. They matched me with the perfect property."
  },
  {
    id: 7,
    name: "Daniel Craig",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    rating: 4.5,
    date: "03 Mar 2024",
    property: "Historic Townhouse Boston",
    text: "Great selection of historic properties. The agent knew the area incredibly well and helped us navigate the specific zoning laws for historic homes."
  },
  {
    id: 8,
    name: "Sophia Chen",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    date: "28 Mar 2024",
    property: "Modern Smart Home Austin",
    text: "The property matches the luxury photos perfectly. The smart home features are state-of-the-art. Best real estate experience I've ever had."
  },
  {
    id: 9,
    name: "William Turner",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    date: "12 Apr 2024",
    property: "Equestrian Estate Texas",
    text: "Finding a property that accommodated both our family and our horses was tough, but the dedicated agents made it happen. Truly a premium service."
  },
  {
    id: 10,
    name: "Isabella Martinez",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    date: "01 May 2024",
    property: "Luxury High-Rise Miami",
    text: "I am absolutely in love with my new condo. The amenities are world-class, and the buying process was completely stress-free. Five stars!"
  }
];

const Reviews = () => {
    return (
        <Box>
            <Typography fontSize={25} fontWeight={700} color="text.primary" mb={3}>
                Client Reviews
            </Typography>

            <Grid container spacing={3}>
                {reviewsData.map((review) => (
                    <Grid item xs={12} md={6} lg={4} key={review.id}>
                        <Card sx={{ borderRadius: "15px", height: '100%', boxShadow: "0 22px 45px 2px rgba(176, 176, 176, 0.1)", bgcolor: "background.paper" }}>
                            <CardContent sx={{ p: 3 }}>
                                <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                                    <Avatar src={review.avatar} sx={{ width: 56, height: 56 }} />
                                    <Box>
                                        <Typography fontWeight={600} fontSize={16} color="text.primary">
                                            {review.name}
                                        </Typography>
                                        <Typography fontSize={12} color="text.secondary">
                                            {review.date}
                                        </Typography>
                                    </Box>
                                </Stack>
                                
                                <Rating value={review.rating} precision={0.5} readOnly size="small" sx={{ mb: 1.5 }} />
                                
                                <Typography fontSize={14} fontWeight={600} color="#475BE8" mb={1}>
                                    {review.property}
                                </Typography>
                                
                                <Typography fontSize={14} color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                    "{review.text}"
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Reviews;
