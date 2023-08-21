export interface ResType {
  // 0成功 1失败
  code: 0 | 1;
  // 介绍
  message: string;
  // 数据
  data: any;
}
