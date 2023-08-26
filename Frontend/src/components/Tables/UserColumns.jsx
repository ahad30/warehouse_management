export const userColumns = [
  {
    header: "ID",
    accessorKey: "id",
    footer: "ID",
  },
  {
    header: "Name",
    columns: [
      {
        header: "First Name",
        accessorKey: "first_name",
        footer: "First Name",
      },
      {
        header: "Last Name",
        accessorKey: "last_name",
        footer: "Last Name",
      },
    ],
  },
  // {
  //   header: "Name",
  //   accessorFn: (row) => `${row.first_name} ${row.last_name}`,
  //   footer: "Name",
  // },
  // {
  //   header: "First Name",
  //   accessorKey: "first_name",
  //   footer: "First Name",
  // },
  // {
  //   header: "Last Name",
  //   accessorKey: "last_name",
  //   footer: "Last Name",
  // },
  {
    header: "Email",
    accessorKey: "email",
    footer: "Email",
  },
  {
    header: "Gender",
    accessorKey: "gender",
    footer: "Gender",
  },
  {
    header: "Date of Birth",
    accessorKey: "dob",
    footer: "Date of Birth",
    //   cell: (info) =>      // format date from ISO string
    //     DateTime.fromISO(info.getValue()).toLocaleString(DateTime),
  },
];
