const all_messages = [
  {
    id: 1,
    sender_name: "Hazem Emam",
    sender_id: 123,
    sender_photo:
      "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
    receiver_name: "Ahmed Mohamed",
    receiver_id: 1234,
    receiver_photo:
      "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp",
    content: "Hello Ahmed, how are you?",
    date: "10-21-2021",
    time: "18:23",
  },
  {
    id: 2,
    sender_name: "Ahmed Mohamed",
    sender_id: 1234,
    sender_photo:
      "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp",
    receiver_name: "Hazem Emam",
    receiver_id: 123,
    receiver_photo:
      "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
    content: "Hi Hazem! I'm doing great, thanks for asking.",
    date: "10-21-2021",
    time: "18:25",
  },
  {
    id: 1000,
    sender_name: "Hazem Emam",
    sender_id: 123,
    sender_photo:
      "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
    receiver_name: "Ahmed Mohamed",
    receiver_id: 1234,
    receiver_photo:
      "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp",
    content: "Hello Ahmed, how are you?",
    date: "10-21-2021",
    time: "18:23",
  },
  {
    id: 1001,
    sender_name: "Ahmed Mohamed",
    sender_id: 1234,
    sender_photo:
      "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp",
    receiver_name: "Hazem Emam",
    receiver_id: 123,
    receiver_photo:
      "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
    content: "Hi Hazem! I'm doing great, thanks for asking.",
    date: "10-21-2021",
    time: "18:25",
  },
  {
    id: 1002,
    sender_name: "Hazem Emam",
    sender_id: 123,
    sender_photo:
      "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
    receiver_name: "Ahmed Mohamed",
    receiver_id: 1234,
    receiver_photo:
      "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp",
    content: "Hello Ahmed, how are you?",
    date: "10-21-2021",
    time: "18:23",
  },
  {
    id: 1003,
    sender_name: "Ahmed Mohamed",
    sender_id: 1234,
    sender_photo:
      "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp",
    receiver_name: "Hazem Emam",
    receiver_id: 123,
    receiver_photo:
      "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
    content: "Hi Hazem! I'm doing great, thanks for asking.",
    date: "10-21-2021",
    time: "18:25",
  },
  {
    id: 1004,
    sender_name: "Hazem Emam",
    sender_id: 123,
    sender_photo:
      "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
    receiver_name: "Ahmed Mohamed",
    receiver_id: 1234,
    receiver_photo:
      "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp",
    content: "Hello Ahmed, how are you?",
    date: "10-21-2021",
    time: "18:23",
  },
  {
    id: 1005,
    sender_name: "Ahmed Mohamed",
    sender_id: 1234,
    sender_photo:
      "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp",
    receiver_name: "Hazem Emam",
    receiver_id: 123,
    receiver_photo:
      "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
    content: "Hi Hazem! I'm doing great, thanks for asking.",
    date: "10-21-2021",
    time: "18:25",
  },
  {
    id: 1006,
    sender_name: "Hazem Emam",
    sender_id: 123,
    sender_photo:
      "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
    receiver_name: "Ahmed Mohamed",
    receiver_id: 1234,
    receiver_photo:
      "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp",
    content: "Hello Ahmed, how are you?",
    date: "10-21-2021",
    time: "18:23",
  },
  {
    id: 1007,
    sender_name: "Ahmed Mohamed",
    sender_id: 1234,
    sender_photo:
      "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp",
    receiver_name: "Hazem Emam",
    receiver_id: 123,
    receiver_photo:
      "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
    content: "Hi Hazem! I'm doing great, thanks for asking.",
    date: "10-21-2021",
    time: "18:25",
  },
  {
    id: 3,
    sender_name: "Hazem Emam",
    sender_id: 123,
    sender_photo:
      "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
    receiver_name: "Sally Sayed",
    receiver_id: 12345,
    receiver_photo:
      "https://img.freepik.com/free-photo/calm-friendly-good-looking-young-african-american-female-with-dreads-pink-stylish-t-shirt-smiling-assured-joyful_176420-31210.jpg?semt=ais_hybrid",
    content: "Glad to hear that! Are you free to meet tomorrow?",
    date: "10-21-2021",
    time: "18:30",
  },
  {
    id: 4,
    sender_name: "Sameh Shady",
    sender_id: 123456,
    sender_photo:
      "https://images.unsplash.com/photo-1640951613773-54706e06851d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHVzZXJ8ZW58MHx8MHx8fDA%3D",
    receiver_name: "Hazem Emam",
    receiver_id: 123,
    receiver_photo:
      "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
    content: "Sure! What time works for you?",
    date: "10-21-2021",
    time: "18:35",
  },
  //   {
  //     sender_name: "Hazem Emam",
  //     sender_id: 123,
  //     sender_photo:
  //       "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
  //     receiver_name: "Sayed Hassan",
  //     receiver_id: 1234,
  //     receiver_photo:
  //       "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
  //     content: "How about 3 PM at the cafe near your place?",
  //     date: "10-21-2021",
  //     time: "18:40",
  //   },
  //   {
  //     sender_name: "Sayed Hassan",
  //     sender_id: 1234,
  //     sender_photo:
  //       "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
  //     receiver_name: "Hazem Emam",
  //     receiver_id: 123,
  //     receiver_photo:
  //       "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
  //     content: "Sounds good. See you then!",
  //     date: "10-21-2021",
  //     time: "18:45",
  //   },
  //   {
  //     sender_name: "Hazem Emam",
  //     sender_id: 123,
  //     sender_photo:
  //       "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
  //     receiver_name: "Sayed Hassan",
  //     receiver_id: 1234,
  //     receiver_photo:
  //       "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
  //     content: "By the way, did you finish the report?",
  //     date: "10-22-2021",
  //     time: "10:15",
  //   },
  //   {
  //     sender_name: "Sayed Hassan",
  //     sender_id: 1234,
  //     sender_photo:
  //       "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
  //     receiver_name: "Hazem Emam",
  //     receiver_id: 123,
  //     receiver_photo:
  //       "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
  //     content: "Not yet, but I’m almost done. Will send it by evening.",
  //     date: "10-22-2021",
  //     time: "10:30",
  //   },
  //   {
  //     sender_name: "Hazem Emam",
  //     sender_id: 123,
  //     sender_photo:
  //       "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
  //     receiver_name: "Sayed Hassan",
  //     receiver_id: 1234,
  //     receiver_photo:
  //       "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
  //     content: "Great! Let me know if you need any help.",
  //     date: "10-22-2021",
  //     time: "10:35",
  //   },
  //   {
  //     sender_name: "Sayed Hassan",
  //     sender_id: 1234,
  //     sender_photo:
  //       "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
  //     receiver_name: "Hazem Emam",
  //     receiver_id: 123,
  //     receiver_photo:
  //       "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
  //     content: "Thanks, Hazem. I appreciate it!",
  //     date: "10-22-2021",
  //     time: "10:40",
  //   },
];

export { all_messages };
