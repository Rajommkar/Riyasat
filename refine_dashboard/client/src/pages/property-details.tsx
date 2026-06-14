import { Typography, Box, Stack, Grid } from '@mui/material';
import { useDelete, useGetIdentity, useShow } from '@refinedev/core';
import { useParams, useNavigate } from 'react-router';
import { ChatBubble, Delete, Edit, Phone, Place, Star, EmailOutlined, PhoneOutlined, LocationCity } from '@mui/icons-material';

import { CustomButton } from '../components';

const premiumCuratedImages: Record<string, string[]> = {
  "Living Room": [
    "https://plus.unsplash.com/premium_photo-1661963428055-4b25a7ebd3a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bHV4dXJ5JTIwbGl2aW5nJTIwcm9vbSUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAwN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1564078516393-cf04bd966897?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8bHV4dXJ5JTIwbGl2aW5nJTIwcm9vbSUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAwN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1704040686428-7534b262d0d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8bHV4dXJ5JTIwbGl2aW5nJTIwcm9vbSUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAwN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1705326701287-346fc37a2c86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8bHV4dXJ5JTIwbGl2aW5nJTIwcm9vbSUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAwN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1661925668034-7019cd82306e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8bHV4dXJ5JTIwbGl2aW5nJTIwcm9vbSUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAwN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1704040686413-2c607dbd2f06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8bHV4dXJ5JTIwbGl2aW5nJTIwcm9vbSUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAwN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1648881806148-e5c51179c826?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8bHV4dXJ5JTIwbGl2aW5nJTIwcm9vbSUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAwN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1720247520862-7e4b14176fa8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8bHV4dXJ5JTIwbGl2aW5nJTIwcm9vbSUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAwN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1663126298656-33616be83c32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8bHV4dXJ5JTIwbGl2aW5nJTIwcm9vbSUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAwN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1688647063090-36f36f692d95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGx1eHVyeSUyMGxpdmluZyUyMHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1758957701419-2c6e266f7988?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fGx1eHVyeSUyMGxpdmluZyUyMHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1757924461488-ef9ad0670978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fGx1eHVyeSUyMGxpdmluZyUyMHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1661926818635-3d413932f2a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTN8fGx1eHVyeSUyMGxpdmluZyUyMHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1720247520881-672bc136da8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fGx1eHVyeSUyMGxpdmluZyUyMHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1745301558339-44eb3217d5da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fGx1eHVyeSUyMGxpdmluZyUyMHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1611094016919-36b65678f3d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fGx1eHVyeSUyMGxpdmluZyUyMHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1661963201626-2c69cfbe4f8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTd8fGx1eHVyeSUyMGxpdmluZyUyMHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1612965607446-25e1332775ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fGx1eHVyeSUyMGxpdmluZyUyMHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1638284457192-27d3d0ec51aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fGx1eHVyeSUyMGxpdmluZyUyMHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1639059790587-95625e6b764c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fGx1eHVyeSUyMGxpdmluZyUyMHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMDd8MA&ixlib=rb-4.1.0&q=80&w=1080"
  ],
  "Kitchen": [
    "https://plus.unsplash.com/premium_photo-1680382578857-c331ead9ed51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bW9kZXJuJTIwbHV4dXJ5JTIwa2l0Y2hlbiUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAwOHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1628745277862-bc0b2d68c50c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8bW9kZXJuJTIwbHV4dXJ5JTIwa2l0Y2hlbiUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAwOHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1502005097973-6a7082348e28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8bW9kZXJuJTIwbHV4dXJ5JTIwa2l0Y2hlbiUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAwOHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1725257928373-dc6d2ac7b145?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8bW9kZXJuJTIwbHV4dXJ5JTIwa2l0Y2hlbiUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAwOHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1661963667668-f53a412a5922?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8bW9kZXJuJTIwbHV4dXJ5JTIwa2l0Y2hlbiUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAwOHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1512916194211-3f2b7f5f7de3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8bW9kZXJuJTIwbHV4dXJ5JTIwa2l0Y2hlbiUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAwOHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1639405069836-f82aa6dcb900?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8bW9kZXJuJTIwbHV4dXJ5JTIwa2l0Y2hlbiUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAwOHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1663811396777-05505d999151?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8bW9kZXJuJTIwbHV4dXJ5JTIwa2l0Y2hlbiUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAwOHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1675615949585-36aaf4cb778d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8bW9kZXJuJTIwbHV4dXJ5JTIwa2l0Y2hlbiUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAwOHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1656402887556-e727ffe1f6d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fG1vZGVybiUyMGx1eHVyeSUyMGtpdGNoZW4lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1683629357963-adf2b1fa9ad9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fG1vZGVybiUyMGx1eHVyeSUyMGtpdGNoZW4lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1643949915134-73a4c880f7c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fG1vZGVybiUyMGx1eHVyeSUyMGtpdGNoZW4lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1676321688609-bb955a90c8c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTN8fG1vZGVybiUyMGx1eHVyeSUyMGtpdGNoZW4lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1683629357935-f3f4777ddf41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fG1vZGVybiUyMGx1eHVyeSUyMGtpdGNoZW4lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1671197244266-73129c97c096?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fG1vZGVybiUyMGx1eHVyeSUyMGtpdGNoZW4lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1613545564259-ede280773613?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fG1vZGVybiUyMGx1eHVyeSUyMGtpdGNoZW4lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1674035037112-e3c34707af1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTd8fG1vZGVybiUyMGx1eHVyeSUyMGtpdGNoZW4lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1668026694348-b73c5eb5e299?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fG1vZGVybiUyMGx1eHVyeSUyMGtpdGNoZW4lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1663811397261-916af74a9363?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fG1vZGVybiUyMGx1eHVyeSUyMGtpdGNoZW4lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1759147960461-b74a7e9a75d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fG1vZGVybiUyMGx1eHVyeSUyMGtpdGNoZW4lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMDh8MA&ixlib=rb-4.1.0&q=80&w=1080"
  ],
  "Bathroom": [
    "https://plus.unsplash.com/premium_photo-1661902468735-eabf780f8ff6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bHV4dXJ5JTIwYmF0aHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1576698483491-8c43f0862543?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8bHV4dXJ5JTIwYmF0aHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1572742482459-e04d6cfdd6f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8bHV4dXJ5JTIwYmF0aHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1742134131017-44d377a611b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8bHV4dXJ5JTIwYmF0aHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1676320514136-5a15d9f97dfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8bHV4dXJ5JTIwYmF0aHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1722923400899-af08ffc715c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8bHV4dXJ5JTIwYmF0aHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1663811396038-7a21d4eef49e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8bHV4dXJ5JTIwYmF0aHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1663811397133-2d1f5addd9d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8bHV4dXJ5JTIwYmF0aHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1676320514021-7c68dda90026?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8bHV4dXJ5JTIwYmF0aHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1756079664354-34944e001f6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGx1eHVyeSUyMGJhdGhyb29tJTIwaW50ZXJpb3J8ZW58MHx8fHwxNzgxNDI3MDA5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1641870538417-c83e621d1425?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fGx1eHVyeSUyMGJhdGhyb29tJTIwaW50ZXJpb3J8ZW58MHx8fHwxNzgxNDI3MDA5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1744025098626-66c0b9cb1ba8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fGx1eHVyeSUyMGJhdGhyb29tJTIwaW50ZXJpb3J8ZW58MHx8fHwxNzgxNDI3MDA5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1661956103157-556678e6dafd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTN8fGx1eHVyeSUyMGJhdGhyb29tJTIwaW50ZXJpb3J8ZW58MHx8fHwxNzgxNDI3MDA5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1667550109459-7251955bced4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fGx1eHVyeSUyMGJhdGhyb29tJTIwaW50ZXJpb3J8ZW58MHx8fHwxNzgxNDI3MDA5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1754574741164-a41418029cfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fGx1eHVyeSUyMGJhdGhyb29tJTIwaW50ZXJpb3J8ZW58MHx8fHwxNzgxNDI3MDA5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1646974400439-8472d58bb19e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fGx1eHVyeSUyMGJhdGhyb29tJTIwaW50ZXJpb3J8ZW58MHx8fHwxNzgxNDI3MDA5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1661902279643-b027d844cc78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTd8fGx1eHVyeSUyMGJhdGhyb29tJTIwaW50ZXJpb3J8ZW58MHx8fHwxNzgxNDI3MDA5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1750036015902-c6f5ebca924e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fGx1eHVyeSUyMGJhdGhyb29tJTIwaW50ZXJpb3J8ZW58MHx8fHwxNzgxNDI3MDA5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1663811396585-94548d37760f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fGx1eHVyeSUyMGJhdGhyb29tJTIwaW50ZXJpb3J8ZW58MHx8fHwxNzgxNDI3MDA5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1754522711595-84428937b07a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fGx1eHVyeSUyMGJhdGhyb29tJTIwaW50ZXJpb3J8ZW58MHx8fHwxNzgxNDI3MDA5fDA&ixlib=rb-4.1.0&q=80&w=1080"
  ],
  "Dining Area": [
    "https://plus.unsplash.com/premium_photo-1670076513880-f58e3c377903?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bHV4dXJ5JTIwZGluaW5nJTIwcm9vbSUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAxMHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1704040686487-a39bb894fc93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8bHV4dXJ5JTIwZGluaW5nJTIwcm9vbSUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAxMHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1684928365257-13121f2742ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8bHV4dXJ5JTIwZGluaW5nJTIwcm9vbSUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAxMHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1613545325268-314979eeef03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8bHV4dXJ5JTIwZGluaW5nJTIwcm9vbSUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAxMHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1661936487321-9db456b6813d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8bHV4dXJ5JTIwZGluaW5nJTIwcm9vbSUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAxMHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1704383014609-747c5afc2bc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8bHV4dXJ5JTIwZGluaW5nJTIwcm9vbSUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAxMHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1613545325797-1eb61f6f1776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8bHV4dXJ5JTIwZGluaW5nJTIwcm9vbSUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAxMHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1777781835626-791c37b62314?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8bHV4dXJ5JTIwZGluaW5nJTIwcm9vbSUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAxMHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1661962461938-b3a74097d946?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8bHV4dXJ5JTIwZGluaW5nJTIwcm9vbSUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAxMHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1777781835512-bad3c28f90ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGx1eHVyeSUyMGRpbmluZyUyMHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1776313756952-32a2ec58d729?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fGx1eHVyeSUyMGRpbmluZyUyMHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1752004028694-72610be3604e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fGx1eHVyeSUyMGRpbmluZyUyMHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1661962953613-f07e83502d4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTN8fGx1eHVyeSUyMGRpbmluZyUyMHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1776313756912-8456579ea487?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fGx1eHVyeSUyMGRpbmluZyUyMHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1776482128056-329afe2fc17e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fGx1eHVyeSUyMGRpbmluZyUyMHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1778731525400-32c189e3b045?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fGx1eHVyeSUyMGRpbmluZyUyMHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1661903996290-e5685980bb2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTd8fGx1eHVyeSUyMGRpbmluZyUyMHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1758448500631-644bb3c1c942?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fGx1eHVyeSUyMGRpbmluZyUyMHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1741852197045-cc35920a3aa0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fGx1eHVyeSUyMGRpbmluZyUyMHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1776993298422-3e8c397d0235?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fGx1eHVyeSUyMGRpbmluZyUyMHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
  ],
  "Gym": [
    "https://plus.unsplash.com/premium_photo-1664301427534-28b6a53a9c4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8aG9tZSUyMGd5bSUyMGVxdWlwbWVudCUyMGx1eHVyeXxlbnwwfHx8fDE3ODE0MjcwMTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1674834727206-4bc272bfd8da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8aG9tZSUyMGd5bSUyMGVxdWlwbWVudCUyMGx1eHVyeXxlbnwwfHx8fDE3ODE0MjcwMTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1627257058769-0a99529e4312?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8aG9tZSUyMGd5bSUyMGVxdWlwbWVudCUyMGx1eHVyeXxlbnwwfHx8fDE3ODE0MjcwMTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1630703178161-1e2f9beddbf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8aG9tZSUyMGd5bSUyMGVxdWlwbWVudCUyMGx1eHVyeXxlbnwwfHx8fDE3ODE0MjcwMTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1672280783618-4f1b70d125f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8aG9tZSUyMGd5bSUyMGVxdWlwbWVudCUyMGx1eHVyeXxlbnwwfHx8fDE3ODE0MjcwMTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1649068618811-9f3547ef98fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8aG9tZSUyMGd5bSUyMGVxdWlwbWVudCUyMGx1eHVyeXxlbnwwfHx8fDE3ODE0MjcwMTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1712220403561-bcf3f59d5927?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8aG9tZSUyMGd5bSUyMGVxdWlwbWVudCUyMGx1eHVyeXxlbnwwfHx8fDE3ODE0MjcwMTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1630703178182-f69a2d617ddb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8aG9tZSUyMGd5bSUyMGVxdWlwbWVudCUyMGx1eHVyeXxlbnwwfHx8fDE3ODE0MjcwMTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1661879916150-f80f71c41df8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8aG9tZSUyMGd5bSUyMGVxdWlwbWVudCUyMGx1eHVyeXxlbnwwfHx8fDE3ODE0MjcwMTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1649068610862-ed43a08442cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGhvbWUlMjBneW0lMjBlcXVpcG1lbnQlMjBsdXh1cnl8ZW58MHx8fHwxNzgxNDI3MDEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1683758507025-6e74ad3ca1e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fGhvbWUlMjBneW0lMjBlcXVpcG1lbnQlMjBsdXh1cnl8ZW58MHx8fHwxNzgxNDI3MDEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1630703178138-3e06b55d53b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fGhvbWUlMjBneW0lMjBlcXVpcG1lbnQlMjBsdXh1cnl8ZW58MHx8fHwxNzgxNDI3MDEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1661879852810-0e6d971154c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTN8fGhvbWUlMjBneW0lMjBlcXVpcG1lbnQlMjBsdXh1cnl8ZW58MHx8fHwxNzgxNDI3MDEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1721394750732-6efdd186cb12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fGhvbWUlMjBneW0lMjBlcXVpcG1lbnQlMjBsdXh1cnl8ZW58MHx8fHwxNzgxNDI3MDEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1639906188555-935e08bbcdf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fGhvbWUlMjBneW0lMjBlcXVpcG1lbnQlMjBsdXh1cnl8ZW58MHx8fHwxNzgxNDI3MDEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1758448756350-3d0eec02ba37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fGhvbWUlMjBneW0lMjBlcXVpcG1lbnQlMjBsdXh1cnl8ZW58MHx8fHwxNzgxNDI3MDEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1670505061070-2664ed450cda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTd8fGhvbWUlMjBneW0lMjBlcXVpcG1lbnQlMjBsdXh1cnl8ZW58MHx8fHwxNzgxNDI3MDEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1758957646695-ec8bce3df462?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fGhvbWUlMjBneW0lMjBlcXVpcG1lbnQlMjBsdXh1cnl8ZW58MHx8fHwxNzgxNDI3MDEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1728488448570-8996dbcc783a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fGhvbWUlMjBneW0lMjBlcXVpcG1lbnQlMjBsdXh1cnl8ZW58MHx8fHwxNzgxNDI3MDEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1721394747060-7cfc57104f88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fGhvbWUlMjBneW0lMjBlcXVpcG1lbnQlMjBsdXh1cnl8ZW58MHx8fHwxNzgxNDI3MDEzfDA&ixlib=rb-4.1.0&q=80&w=1080"
  ],
  "Backyard": [
    "https://plus.unsplash.com/premium_photo-1733514692194-1cc39ee41141?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bHV4dXJ5JTIwYmFja3lhcmQlMjBwYXRpb3xlbnwwfHx8fDE3ODE0MjcwMTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1684704182972-99ffeb87bcae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8bHV4dXJ5JTIwYmFja3lhcmQlMjBwYXRpb3xlbnwwfHx8fDE3ODE0MjcwMTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1763479142678-8e29f4edb538?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8bHV4dXJ5JTIwYmFja3lhcmQlMjBwYXRpb3xlbnwwfHx8fDE3ODE0MjcwMTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1762811054950-b74e0a055c80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8bHV4dXJ5JTIwYmFja3lhcmQlMjBwYXRpb3xlbnwwfHx8fDE3ODE0MjcwMTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1686167991356-b60859d9a34f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8bHV4dXJ5JTIwYmFja3lhcmQlMjBwYXRpb3xlbnwwfHx8fDE3ODE0MjcwMTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1766603636787-d48785d00367?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8bHV4dXJ5JTIwYmFja3lhcmQlMjBwYXRpb3xlbnwwfHx8fDE3ODE0MjcwMTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1780287857844-362c9c040ac4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8bHV4dXJ5JTIwYmFja3lhcmQlMjBwYXRpb3xlbnwwfHx8fDE3ODE0MjcwMTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1766603636766-1f4662469448?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8bHV4dXJ5JTIwYmFja3lhcmQlMjBwYXRpb3xlbnwwfHx8fDE3ODE0MjcwMTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1733514692185-6cc0d44247fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8bHV4dXJ5JTIwYmFja3lhcmQlMjBwYXRpb3xlbnwwfHx8fDE3ODE0MjcwMTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1749036838879-e8ef99b902b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGx1eHVyeSUyMGJhY2t5YXJkJTIwcGF0aW98ZW58MHx8fHwxNzgxNDI3MDE0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1763479142280-675629f6db27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fGx1eHVyeSUyMGJhY2t5YXJkJTIwcGF0aW98ZW58MHx8fHwxNzgxNDI3MDE0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1758424106282-6d8476c33b19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fGx1eHVyeSUyMGJhY2t5YXJkJTIwcGF0aW98ZW58MHx8fHwxNzgxNDI3MDE0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1682889762399-02b4ce92b1ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTN8fGx1eHVyeSUyMGJhY2t5YXJkJTIwcGF0aW98ZW58MHx8fHwxNzgxNDI3MDE0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1780719961418-ee8b671e3a46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fGx1eHVyeSUyMGJhY2t5YXJkJTIwcGF0aW98ZW58MHx8fHwxNzgxNDI3MDE0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1613544723371-23b514a78c85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fGx1eHVyeSUyMGJhY2t5YXJkJTIwcGF0aW98ZW58MHx8fHwxNzgxNDI3MDE0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1694885090746-d90472e11c0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fGx1eHVyeSUyMGJhY2t5YXJkJTIwcGF0aW98ZW58MHx8fHwxNzgxNDI3MDE0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1724659215951-8f1aff5672af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTd8fGx1eHVyeSUyMGJhY2t5YXJkJTIwcGF0aW98ZW58MHx8fHwxNzgxNDI3MDE0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1674672670977-bcf517fc2376?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fGx1eHVyeSUyMGJhY2t5YXJkJTIwcGF0aW98ZW58MHx8fHwxNzgxNDI3MDE0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1780571616416-e44643f9f427?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fGx1eHVyeSUyMGJhY2t5YXJkJTIwcGF0aW98ZW58MHx8fHwxNzgxNDI3MDE0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1613544723366-448490ac466b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fGx1eHVyeSUyMGJhY2t5YXJkJTIwcGF0aW98ZW58MHx8fHwxNzgxNDI3MDE0fDA&ixlib=rb-4.1.0&q=80&w=1080"
  ],
  "Garage": [
    "https://plus.unsplash.com/premium_photo-1737591339002-a04f2ad97df6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bHV4dXJ5JTIwZ2FyYWdlJTIwaW50ZXJpb3IlMjBjYXJzfGVufDB8fHx8MTc4MTQyNzAxNnww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1551522435-a13afa10f103?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8bHV4dXJ5JTIwZ2FyYWdlJTIwaW50ZXJpb3IlMjBjYXJzfGVufDB8fHx8MTc4MTQyNzAxNnww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1618642624018-a370cbf3cd80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8bHV4dXJ5JTIwZ2FyYWdlJTIwaW50ZXJpb3IlMjBjYXJzfGVufDB8fHx8MTc4MTQyNzAxNnww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1731740669551-5404a8407641?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8bHV4dXJ5JTIwZ2FyYWdlJTIwaW50ZXJpb3IlMjBjYXJzfGVufDB8fHx8MTc4MTQyNzAxNnww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1737576763405-a105de4c47d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8bHV4dXJ5JTIwZ2FyYWdlJTIwaW50ZXJpb3IlMjBjYXJzfGVufDB8fHx8MTc4MTQyNzAxNnww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1682795735660-a789079d5623?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8bHV4dXJ5JTIwZ2FyYWdlJTIwaW50ZXJpb3IlMjBjYXJzfGVufDB8fHx8MTc4MTQyNzAxNnww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1624910985754-4a6ed65ae3f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8bHV4dXJ5JTIwZ2FyYWdlJTIwaW50ZXJpb3IlMjBjYXJzfGVufDB8fHx8MTc4MTQyNzAxNnww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1619795080853-88b800fc4339?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8bHV4dXJ5JTIwZ2FyYWdlJTIwaW50ZXJpb3IlMjBjYXJzfGVufDB8fHx8MTc4MTQyNzAxNnww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1748957575590-3c48bdca7e8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8bHV4dXJ5JTIwZ2FyYWdlJTIwaW50ZXJpb3IlMjBjYXJzfGVufDB8fHx8MTc4MTQyNzAxNnww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1547672932-0c1fcf8be920?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGx1eHVyeSUyMGdhcmFnZSUyMGludGVyaW9yJTIwY2Fyc3xlbnwwfHx8fDE3ODE0MjcwMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1654816022104-ed536258d9c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fGx1eHVyeSUyMGdhcmFnZSUyMGludGVyaW9yJTIwY2Fyc3xlbnwwfHx8fDE3ODE0MjcwMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1769641241150-26c44a98e17a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fGx1eHVyeSUyMGdhcmFnZSUyMGludGVyaW9yJTIwY2Fyc3xlbnwwfHx8fDE3ODE0MjcwMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1736784959712-3b6b820cc8bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTN8fGx1eHVyeSUyMGdhcmFnZSUyMGludGVyaW9yJTIwY2Fyc3xlbnwwfHx8fDE3ODE0MjcwMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1753281797108-9d294df6504e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fGx1eHVyeSUyMGdhcmFnZSUyMGludGVyaW9yJTIwY2Fyc3xlbnwwfHx8fDE3ODE0MjcwMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1779202594580-f2487756b503?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fGx1eHVyeSUyMGdhcmFnZSUyMGludGVyaW9yJTIwY2Fyc3xlbnwwfHx8fDE3ODE0MjcwMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1762197996770-6058bd2299b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fGx1eHVyeSUyMGdhcmFnZSUyMGludGVyaW9yJTIwY2Fyc3xlbnwwfHx8fDE3ODE0MjcwMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1694394360264-8d2197ab3749?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTd8fGx1eHVyeSUyMGdhcmFnZSUyMGludGVyaW9yJTIwY2Fyc3xlbnwwfHx8fDE3ODE0MjcwMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1686586363712-f09acc14c196?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fGx1eHVyeSUyMGdhcmFnZSUyMGludGVyaW9yJTIwY2Fyc3xlbnwwfHx8fDE3ODE0MjcwMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1776614040427-911609bc55eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fGx1eHVyeSUyMGdhcmFnZSUyMGludGVyaW9yJTIwY2Fyc3xlbnwwfHx8fDE3ODE0MjcwMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1686586362188-3dbd6492a426?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fGx1eHVyeSUyMGdhcmFnZSUyMGludGVyaW9yJTIwY2Fyc3xlbnwwfHx8fDE3ODE0MjcwMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
  ],
  "Master Bedroom": [
    "https://plus.unsplash.com/premium_photo-1661879252375-7c1db1932572?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bHV4dXJ5JTIwbWFzdGVyJTIwYmVkcm9vbSUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAxN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1780569255700-2a4e5beea779?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8bHV4dXJ5JTIwbWFzdGVyJTIwYmVkcm9vbSUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAxN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1765434669956-afcd50058d69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8bHV4dXJ5JTIwbWFzdGVyJTIwYmVkcm9vbSUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAxN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1758448755969-8791367cf5c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8bHV4dXJ5JTIwbWFzdGVyJTIwYmVkcm9vbSUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAxN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1661877303180-19a028c21048?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8bHV4dXJ5JTIwbWFzdGVyJTIwYmVkcm9vbSUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAxN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1572742482459-e04d6cfdd6f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8bHV4dXJ5JTIwbWFzdGVyJTIwYmVkcm9vbSUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAxN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1765279333918-949ddcb655ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8bHV4dXJ5JTIwbWFzdGVyJTIwYmVkcm9vbSUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAxN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1765434669989-10e45046085c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8bHV4dXJ5JTIwbWFzdGVyJTIwYmVkcm9vbSUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAxN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1661962739798-0af59dc30d14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8bHV4dXJ5JTIwbWFzdGVyJTIwYmVkcm9vbSUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAxN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1765434670017-c0d28ecde29a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGx1eHVyeSUyMG1hc3RlciUyMGJlZHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1768487422639-7ba3900d0f02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fGx1eHVyeSUyMG1hc3RlciUyMGJlZHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1770941633927-b7a15557e0e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fGx1eHVyeSUyMG1hc3RlciUyMGJlZHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1746888841255-42d2452f6ebe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTN8fGx1eHVyeSUyMG1hc3RlciUyMGJlZHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1645237455598-e8f02d706a4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fGx1eHVyeSUyMG1hc3RlciUyMGJlZHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1662454419736-de132ff75638?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fGx1eHVyeSUyMG1hc3RlciUyMGJlZHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1662454419716-c4c504728811?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fGx1eHVyeSUyMG1hc3RlciUyMGJlZHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1746471641440-124e23d6e634?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTd8fGx1eHVyeSUyMG1hc3RlciUyMGJlZHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fGx1eHVyeSUyMG1hc3RlciUyMGJlZHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1772563214602-3c6434766700?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fGx1eHVyeSUyMG1hc3RlciUyMGJlZHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1521783988139-89397d761dce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fGx1eHVyeSUyMG1hc3RlciUyMGJlZHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
  ],
  "Guest Bedroom": [
    "https://plus.unsplash.com/premium_photo-1671269704807-5479855d03fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bW9kZXJuJTIwYmVkcm9vbSUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAxOXww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1696762932825-2737db830bbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8bW9kZXJuJTIwYmVkcm9vbSUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAxOXww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1750420556288-d0e32a6f517b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8bW9kZXJuJTIwYmVkcm9vbSUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAxOXww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1720420021124-4e18564e070f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8bW9kZXJuJTIwYmVkcm9vbSUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAxOXww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1675616563084-63d1f129623d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8bW9kZXJuJTIwYmVkcm9vbSUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAxOXww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1604580040660-f0a7f9abaea6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8bW9kZXJuJTIwYmVkcm9vbSUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAxOXww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1642541070065-3912f347e7c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8bW9kZXJuJTIwYmVkcm9vbSUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAxOXww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1663811397207-418a92396ad5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8bW9kZXJuJTIwYmVkcm9vbSUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAxOXww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1674676471081-0236e34485fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8bW9kZXJuJTIwYmVkcm9vbSUyMGludGVyaW9yfGVufDB8fHx8MTc4MTQyNzAxOXww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1699869653495-fe26f4c70b3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fG1vZGVybiUyMGJlZHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1663811397007-010e535ffcd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fG1vZGVybiUyMGJlZHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1644057501622-dfa7dd26dbfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fG1vZGVybiUyMGJlZHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1661962688308-2b00b88b9765?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTN8fG1vZGVybiUyMGJlZHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1613685703237-6628de38ddb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fG1vZGVybiUyMGJlZHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1648634158203-199accfd7afc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fG1vZGVybiUyMGJlZHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1757344454333-cc666252e596?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fG1vZGVybiUyMGJlZHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1671269705768-cad27668134c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTd8fG1vZGVybiUyMGJlZHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1662454419716-c4c504728811?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fG1vZGVybiUyMGJlZHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1663811397057-8bd306b4dcad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fG1vZGVybiUyMGJlZHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1653204095671-3ed81a4bc561?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fG1vZGVybiUyMGJlZHJvb20lMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODE0MjcwMTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
  ],
  "Pool & Balcony": [
    "https://plus.unsplash.com/premium_photo-1733306523667-80d5e5668631?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bHV4dXJ5JTIwc3dpbW1pbmclMjBwb29sJTIwaG91c2V8ZW58MHx8fHwxNzgxNDI3MDIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8bHV4dXJ5JTIwc3dpbW1pbmclMjBwb29sJTIwaG91c2V8ZW58MHx8fHwxNzgxNDI3MDIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8bHV4dXJ5JTIwc3dpbW1pbmclMjBwb29sJTIwaG91c2V8ZW58MHx8fHwxNzgxNDI3MDIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8bHV4dXJ5JTIwc3dpbW1pbmclMjBwb29sJTIwaG91c2V8ZW58MHx8fHwxNzgxNDI3MDIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1687960116228-13d383d20188?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8bHV4dXJ5JTIwc3dpbW1pbmclMjBwb29sJTIwaG91c2V8ZW58MHx8fHwxNzgxNDI3MDIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8bHV4dXJ5JTIwc3dpbW1pbmclMjBwb29sJTIwaG91c2V8ZW58MHx8fHwxNzgxNDI3MDIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8bHV4dXJ5JTIwc3dpbW1pbmclMjBwb29sJTIwaG91c2V8ZW58MHx8fHwxNzgxNDI3MDIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8bHV4dXJ5JTIwc3dpbW1pbmclMjBwb29sJTIwaG91c2V8ZW58MHx8fHwxNzgxNDI3MDIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1746387628298-af5695a3f935?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8bHV4dXJ5JTIwc3dpbW1pbmclMjBwb29sJTIwaG91c2V8ZW58MHx8fHwxNzgxNDI3MDIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1670589953882-b94c9cb380f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGx1eHVyeSUyMHN3aW1taW5nJTIwcG9vbCUyMGhvdXNlfGVufDB8fHx8MTc4MTQyNzAyMHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1509600110300-21b9d5fedeb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fGx1eHVyeSUyMHN3aW1taW5nJTIwcG9vbCUyMGhvdXNlfGVufDB8fHx8MTc4MTQyNzAyMHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1529290130-4ca3753253ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fGx1eHVyeSUyMHN3aW1taW5nJTIwcG9vbCUyMGhvdXNlfGVufDB8fHx8MTc4MTQyNzAyMHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1664303906236-057fc3eb9fc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTN8fGx1eHVyeSUyMHN3aW1taW5nJTIwcG9vbCUyMGhvdXNlfGVufDB8fHx8MTc4MTQyNzAyMHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1635108201418-0996823f4cc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fGx1eHVyeSUyMHN3aW1taW5nJTIwcG9vbCUyMGhvdXNlfGVufDB8fHx8MTc4MTQyNzAyMHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1717404719828-a443f37235ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fGx1eHVyeSUyMHN3aW1taW5nJTIwcG9vbCUyMGhvdXNlfGVufDB8fHx8MTc4MTQyNzAyMHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1706043890009-9aae000532cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fGx1eHVyeSUyMHN3aW1taW5nJTIwcG9vbCUyMGhvdXNlfGVufDB8fHx8MTc4MTQyNzAyMHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1748729845214-52beb048903d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTd8fGx1eHVyeSUyMHN3aW1taW5nJTIwcG9vbCUyMGhvdXNlfGVufDB8fHx8MTc4MTQyNzAyMHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1767950470198-c9cd97f8ed87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fGx1eHVyeSUyMHN3aW1taW5nJTIwcG9vbCUyMGhvdXNlfGVufDB8fHx8MTc4MTQyNzAyMHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1707189856923-46dd41ea2bdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fGx1eHVyeSUyMHN3aW1taW5nJTIwcG9vbCUyMGhvdXNlfGVufDB8fHx8MTc4MTQyNzAyMHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1599777560450-e462cffc5368?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fGx1eHVyeSUyMHN3aW1taW5nJTIwcG9vbCUyMGhvdXNlfGVufDB8fHx8MTc4MTQyNzAyMHww&ixlib=rb-4.1.0&q=80&w=1080"
  ]
};

const galleryRooms = Object.keys(premiumCuratedImages);

const getGalleryImage = (roomName: string, id: string) => {
    // Generate a unique numeric seed from the property ID
    let hash = 0;
    if (id) {
        for (let i = 0; i < id.length; i++) {
            hash = id.charCodeAt(i) + ((hash << 5) - hash);
        }
    }
    const seed = Math.abs(hash);
    
    // Select from our premium pool deterministically
    const pool = premiumCuratedImages[roomName] || premiumCuratedImages['Living Room']; 
    return pool[seed % pool.length];
};

const PropertyDetails = () => {
    const navigate = useNavigate();
    const { data: user } = useGetIdentity();
    const { id } = useParams();
    const { mutate } = useDelete();
    const { query } = useShow();

    const { data, isLoading, isError } = query;

    const propertyDetails = data?.data ?? {};

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;

    const isCurrentUser = user?.email === propertyDetails.creator?.email;

    const handleDeleteProperty = () => {
        const response = window.confirm('Are you sure you want to delete this property?');
        if (response) {
            mutate({
                resource: 'properties',
                id: id as string,
            }, {
                onSuccess: () => {
                    navigate('/properties');
                }
            });
        }
    };

    return (
        <Box
            className="fade-in-slide-up"
            borderRadius="15px"
            padding="20px"
            bgcolor="background.paper"
            width="fit-content"
        >
            <Typography fontSize={25} fontWeight={700} color="text.primary">
                Details
            </Typography>

            <Box mt="20px" display="flex" flexDirection={{ xs: 'column', lg: 'row' }} gap={4}>
                {/* Left Side: Image and Details */}
                <Box flex={1} maxWidth={764}>
                    <img
                        src={propertyDetails.photo}
                        alt={propertyDetails.title}
                        height={546}
                        width="100%"
                        style={{ objectFit: 'cover', borderRadius: '10px' }}
                        className="property_details-img"
                    />

                    <Box mt="15px">
                        <Stack direction="row" justifyContent="space-between" flexWrap="wrap" alignItems="center">
                            <Typography fontSize={18} fontWeight={500} color="text.primary" textTransform="capitalize">
                                {propertyDetails.propertyType}
                            </Typography>
                            <Box>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={`star-${star}`} sx={{ color: '#F2C94C' }} />
                                ))}
                            </Box>
                        </Stack>

                        <Stack direction="row" alignItems="center" gap={0.5} mt={0.5}>
                            <Place sx={{ color: "text.secondary" }} />
                            <Typography fontSize={14} color="text.secondary">
                                {propertyDetails.location}
                            </Typography>
                        </Stack>

                        <Typography fontSize={22} fontWeight={600} color="text.primary" mt={2}>
                            {propertyDetails.title}
                        </Typography>

                        <Typography fontSize={18} fontWeight={500} color="text.primary" mt={2}>
                            Price
                        </Typography>
                        <Typography fontSize={25} fontWeight={700} color="#475BE8">
                            ${propertyDetails.price}
                        </Typography>

                        <Typography fontSize={18} fontWeight={500} color="text.primary" mt={2}>
                            Description
                        </Typography>
                        <Typography fontSize={14} color="text.secondary">
                            {propertyDetails.description}
                        </Typography>
                        
                        <Typography fontSize={22} fontWeight={600} color="text.primary" mt={4} mb={2}>
                            Property Gallery
                        </Typography>
                        <Grid container spacing={2}>
                            {galleryRooms.map((room) => (
                                <Grid item xs={12} sm={6} md={4} key={room}>
                                    <Box sx={{ position: "relative", overflow: "hidden", borderRadius: "10px", "&:hover img": { transform: "scale(1.1)" } }}>
                                        <img 
                                            src={getGalleryImage(room, propertyDetails._id)} 
                                            alt={room}
                                            loading="lazy"
                                            width="100%"
                                            height={180}
                                            style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                                        />
                                        <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0, p: 1, bgcolor: "rgba(0,0,0,0.5)" }}>
                                            <Typography color="white" fontWeight={500} fontSize={14}>{room}</Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>

                {/* Right Side: Creator Info and Buttons */}
                <Box width="100%" flex={1} maxWidth={326} display="flex" flexDirection="column" gap="20px">
                    <Stack
                        width="100%"
                        p={2}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        border="1px solid #E4E4E4"
                        borderRadius={2}
                        sx={{
                            transition: "all 0.3s ease",
                            cursor: "pointer",
                            "&:hover": {
                                boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
                                transform: "translateY(-5px)"
                            }
                        }}
                    >
                        <img
                            src={(propertyDetails.creator?.avatar && propertyDetails.creator.avatar.startsWith("http")) ? propertyDetails.creator.avatar : "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256"}
                            alt="avatar"
                            width={90}
                            height={90}
                            style={{ borderRadius: 8, objectFit: 'cover' }}
                        />

                        <Box mt="15px" display="flex" flexDirection="column" alignItems="center">
                            <Typography fontSize={22} fontWeight={600} color="text.primary">
                                {propertyDetails.creator?.name}
                            </Typography>
                            <Typography mt="5px" fontSize={14} color="text.secondary">
                                Real-Estate Agent
                            </Typography>
                        </Box>

                        <Stack mt="15px" direction="column" gap={2} width="100%">
                            <Stack direction="row" gap={1.5}>
                                <EmailOutlined sx={{ color: "text.secondary" }} />
                                <Typography fontSize={14} color="text.secondary">
                                    {propertyDetails.creator?.email}
                                </Typography>
                            </Stack>

                            <Stack direction="row" gap={1.5}>
                                <Place sx={{ color: "text.secondary" }} />
                                <Typography fontSize={14} color="text.secondary">
                                    {propertyDetails.creator?.allProperties?.[0]?.location || propertyDetails.location}
                                </Typography>
                            </Stack>

                            <Stack direction="row" gap={1.5}>
                                <PhoneOutlined sx={{ color: "text.secondary" }} />
                                <Typography fontSize={14} color="text.secondary">
                                    +502-3231-4141
                                </Typography>
                            </Stack>

                            <Stack direction="row" gap={1.5}>
                                <LocationCity sx={{ color: "text.secondary" }} />
                                <Typography fontSize={14} color="text.secondary">
                                    {propertyDetails.creator?.allProperties?.length || 0} Properties
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>

                    <Stack width="100%" mt="25px" direction="row" flexWrap="wrap" gap={2}>
                        <CustomButton
                            title={!isCurrentUser ? 'Message' : 'Edit'}
                            backgroundColor="#475BE8"
                            color="#FCFCFC"
                            fullWidth
                            icon={!isCurrentUser ? <ChatBubble /> : <Edit />}
                            handleClick={() => {
                                if (isCurrentUser) {
                                    navigate(`/properties/edit/${propertyDetails._id}`);
                                }
                            }}
                        />
                        <CustomButton
                            title={!isCurrentUser ? 'Call' : 'Delete'}
                            backgroundColor={!isCurrentUser ? '#2ED480' : '#d42e2e'}
                            color="#FCFCFC"
                            fullWidth
                            icon={!isCurrentUser ? <Phone /> : <Delete />}
                            handleClick={() => {
                                if (isCurrentUser) handleDeleteProperty();
                            }}
                        />
                    </Stack>

                    <Box mt="25px" sx={{ overflow: 'hidden', borderRadius: '10px' }}>
                        <img
                            src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/w_2560%2Cc_limit/GoogleMapTA.jpg"
                            alt="map"
                            width="100%"
                            height={306}
                            style={{ objectFit: 'cover', transition: 'transform 0.4s ease', cursor: 'pointer' }}
                            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                        />
                    </Box>

                    <Box mt="25px">
                        <CustomButton
                            title="Book Now"
                            backgroundColor="#475BE8"
                            color="#FCFCFC"
                            fullWidth
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default PropertyDetails;
