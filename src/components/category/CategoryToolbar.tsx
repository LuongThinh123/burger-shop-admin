import HeaderCustom from "@components/_common/HeaderCustom/HeaderCustom";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import { useAppDispatch } from "@store";
import { CategoryActions } from "@store/category";

export const CategoryToolbar = () => {
  const dispatch = useAppDispatch();
  const handleAdd = () => {
    dispatch(
      CategoryActions.setForm({
        open: true,
        category: null,
      })
    );
  };

  return (
    <HeaderCustom title="Quản lý loại sản phẩm">
      <Box>
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleAdd()}
          startIcon={<AddIcon />}
        >
          Thêm loại sản phẩm
        </Button>
      </Box>
    </HeaderCustom>
  );
};
