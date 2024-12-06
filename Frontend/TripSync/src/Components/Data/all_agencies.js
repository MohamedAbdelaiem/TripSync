const all_agencies = [
  {
    TravelAgencyID: "1",
    Username: "holiday_travel",
    ProfilePicture: "https://scontent.fcai21-4.fna.fbcdn.net/v/t1.6435-9/68612818_1273411009485133_9205348017618550784_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFFPkESJrGjYXcntjH2zho8nqUEHYvY8sOepQQdi9jyw0wpiZpoiBlW_xF5oNiWXClBBQiQqnAsmzNxWze2CCK8&_nc_ohc=-uHXYeyGOfkQ7kNvgGGsWkg&_nc_zt=23&_nc_ht=scontent.fcai21-4.fna&_nc_gid=AHFFz32L1ah15DI02SWSqub&oh=00_AYChxo4cwaTnMwvd5-r8nbnMjoe_HUHkhuGR6pZuRF4IPg&oe=67796C59",
    ProfileName: "Holiday Travel",
    Address: "123 Nile Avenue, Cairo",
    Location: "Cairo, Egypt",
    Rate: "4.8/5",
    Description:
      "A leading travel agency specializing in premium travel services.",
    Mail: "contact@holidaytravel.com",
    Phone: "+20 123 456 7890",
    Country: "Egypt",
    role: "travel_agency",
  },
  {
    TravelAgencyID: "2",
    Username: "holiday_travel",
    ProfilePicture: "https://scontent.fcai21-4.fna.fbcdn.net/v/t1.6435-9/68612818_1273411009485133_9205348017618550784_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFFPkESJrGjYXcntjH2zho8nqUEHYvY8sOepQQdi9jyw0wpiZpoiBlW_xF5oNiWXClBBQiQqnAsmzNxWze2CCK8&_nc_ohc=-uHXYeyGOfkQ7kNvgGGsWkg&_nc_zt=23&_nc_ht=scontent.fcai21-4.fna&_nc_gid=AHFFz32L1ah15DI02SWSqub&oh=00_AYChxo4cwaTnMwvd5-r8nbnMjoe_HUHkhuGR6pZuRF4IPg&oe=67796C59",
    ProfileName: "Holiday Travel Agency",
    Address: "123 Nile Avenue, Cairo",
    Location: "Cairo, Egypt",
    Rate: "4.8/5",
    Description:
      "A leading travel agency specializing in premium travel services.",
    Mail: "contact@holidaytravel.com",
    Phone: "+20 123 456 7890",
    Country: "Egypt",
    role: "travel_agency",
  },
  {
    TravelAgencyID: "3",
    Username: "holiday_travel",
    ProfilePicture: "https://scontent.fcai21-4.fna.fbcdn.net/v/t1.6435-9/68612818_1273411009485133_9205348017618550784_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFFPkESJrGjYXcntjH2zho8nqUEHYvY8sOepQQdi9jyw0wpiZpoiBlW_xF5oNiWXClBBQiQqnAsmzNxWze2CCK8&_nc_ohc=-uHXYeyGOfkQ7kNvgGGsWkg&_nc_zt=23&_nc_ht=scontent.fcai21-4.fna&_nc_gid=AHFFz32L1ah15DI02SWSqub&oh=00_AYChxo4cwaTnMwvd5-r8nbnMjoe_HUHkhuGR6pZuRF4IPg&oe=67796C59",
    ProfileName: "Holiday Travel Agency",
    Address: "123 Nile Avenue, Cairo",
    Location: "Cairo, Egypt",
    Rate: "4.8/5",
    Description:
      "A leading travel agency specializing in premium travel services.",
    Mail: "contact@holidaytravel.com",
    Phone: "+20 123 456 7890",
    Country: "Egypt",
    role: "travel_agency",
  },
  // {
  //   TravelAgencyID: "001",
  //   Username: "holiday_travel",
  //   ProfilePicture: "https://scontent.fcai21-4.fna.fbcdn.net/v/t1.6435-9/68612818_1273411009485133_9205348017618550784_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFFPkESJrGjYXcntjH2zho8nqUEHYvY8sOepQQdi9jyw0wpiZpoiBlW_xF5oNiWXClBBQiQqnAsmzNxWze2CCK8&_nc_ohc=-uHXYeyGOfkQ7kNvgGGsWkg&_nc_zt=23&_nc_ht=scontent.fcai21-4.fna&_nc_gid=AHFFz32L1ah15DI02SWSqub&oh=00_AYChxo4cwaTnMwvd5-r8nbnMjoe_HUHkhuGR6pZuRF4IPg&oe=67796C59",
  //   ProfileName: "Holiday Travel Agency",
  //   Address: "123 Nile Avenue, Cairo",
  //   Location: "Cairo, Egypt",
  //   Rate: "4.8/5",
  //   Description:
  //     "A leading travel agency specializing in premium travel services.",
  //   Mail: "contact@holidaytravel.com",
  //   Phone: "+20 123 456 7890",
  //   Country: "Egypt",
  //   role: "travel_agency",
  // },
  // {
  //   TravelAgencyID: "001",
  //   Username: "holiday_travel",
  //   ProfilePicture: "https://scontent.fcai21-4.fna.fbcdn.net/v/t1.6435-9/68612818_1273411009485133_9205348017618550784_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFFPkESJrGjYXcntjH2zho8nqUEHYvY8sOepQQdi9jyw0wpiZpoiBlW_xF5oNiWXClBBQiQqnAsmzNxWze2CCK8&_nc_ohc=-uHXYeyGOfkQ7kNvgGGsWkg&_nc_zt=23&_nc_ht=scontent.fcai21-4.fna&_nc_gid=AHFFz32L1ah15DI02SWSqub&oh=00_AYChxo4cwaTnMwvd5-r8nbnMjoe_HUHkhuGR6pZuRF4IPg&oe=67796C59",
  //   ProfileName: "Holiday Travel Agency",
  //   Address: "123 Nile Avenue, Cairo",
  //   Location: "Cairo, Egypt",
  //   Rate: "4.8/5",
  //   Description:
  //     "A leading travel agency specializing in premium travel services.",
  //   Mail: "contact@holidaytravel.com",
  //   Phone: "+20 123 456 7890",
  //   Country: "Egypt",
  //   role: "travel_agency",
  // },
  // {
  //   TravelAgencyID: "001",
  //   Username: "holiday_travel",
  //   ProfilePicture: "https://scontent.fcai21-4.fna.fbcdn.net/v/t1.6435-9/68612818_1273411009485133_9205348017618550784_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFFPkESJrGjYXcntjH2zho8nqUEHYvY8sOepQQdi9jyw0wpiZpoiBlW_xF5oNiWXClBBQiQqnAsmzNxWze2CCK8&_nc_ohc=-uHXYeyGOfkQ7kNvgGGsWkg&_nc_zt=23&_nc_ht=scontent.fcai21-4.fna&_nc_gid=AHFFz32L1ah15DI02SWSqub&oh=00_AYChxo4cwaTnMwvd5-r8nbnMjoe_HUHkhuGR6pZuRF4IPg&oe=67796C59",
  //   ProfileName: "Holiday Travel Agency",
  //   Address: "123 Nile Avenue, Cairo",
  //   Location: "Cairo, Egypt",
  //   Rate: "4.8/5",
  //   Description:
  //     "A leading travel agency specializing in premium travel services.",
  //   Mail: "contact@holidaytravel.com",
  //   Phone: "+20 123 456 7890",
  //   Country: "Egypt",
  //   role: "travel_agency",
  // },
  // {
  //   TravelAgencyID: "001",
  //   Username: "holiday_travel",
  //   ProfilePicture: "https://scontent.fcai21-4.fna.fbcdn.net/v/t1.6435-9/68612818_1273411009485133_9205348017618550784_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFFPkESJrGjYXcntjH2zho8nqUEHYvY8sOepQQdi9jyw0wpiZpoiBlW_xF5oNiWXClBBQiQqnAsmzNxWze2CCK8&_nc_ohc=-uHXYeyGOfkQ7kNvgGGsWkg&_nc_zt=23&_nc_ht=scontent.fcai21-4.fna&_nc_gid=AHFFz32L1ah15DI02SWSqub&oh=00_AYChxo4cwaTnMwvd5-r8nbnMjoe_HUHkhuGR6pZuRF4IPg&oe=67796C59",
  //   ProfileName: "Holiday Travel Agency",
  //   Address: "123 Nile Avenue, Cairo",
  //   Location: "Cairo, Egypt",
  //   Rate: "4.8/5",
  //   Description:
  //     "A leading travel agency specializing in premium travel services.",
  //   Mail: "contact@holidaytravel.com",
  //   Phone: "+20 123 456 7890",
  //   Country: "Egypt",
  //   role: "travel_agency",
  // },
];

export { all_agencies };
