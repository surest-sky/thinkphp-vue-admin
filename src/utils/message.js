import { MessageBox } from "element-ui";

export function success_(title){
    this.$message({
        message: title,
        type: "success"
      });
}

export function error_(title) {
    this.$message.error(title);
}

export function MessageConfirm(title, func) {
    MessageBox.confirm(title, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        func()
      })
}