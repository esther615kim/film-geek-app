import { useState } from "react";
import { View } from "react-native";
import { DataTable } from "react-native-paper";

const Pagination = ({ moviesPerPage, totalMovies, paginate }) => {
  const [page, setPage] = useState(1);

  const numberOfPages = Math.ceil(totalMovies / moviesPerPage);

  return (
    <View>
      {numberOfPages ? (
        <DataTable>
          <DataTable.Pagination
            numberOfPages={numberOfPages}
            page={page}
            label={`Page ${page} of ${numberOfPages}`}
            onPageChange={(page) => {
              paginate(page);
              setPage(page);
            }}
          />
        </DataTable>
      ) : null}
    </View>
  );
};

export default Pagination;
