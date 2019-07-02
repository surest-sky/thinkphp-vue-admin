export function success_(title){
    this.$message({
        message: title,
        type: "success"
      });
}

export function error_(title) {
    this.$message.error(title);
}