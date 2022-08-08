export default (string) => /[a-z 0-9-=[\];',./~!@#$%^&*()_+{}|:"<>?%]/gi.test(string)
