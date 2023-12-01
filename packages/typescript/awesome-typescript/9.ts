/*
 * @Author: huangjh334 黄杰鸿 huangjh334@midea.com
 * @Date: 2023-08-01 11:43:49
 * @LastEditors: huangjh334 黄杰鸿 huangjh334@midea.com
 * @LastEditTime: 2023-08-01 11:44:00
 */

/**
 * 第九题
 * https://github.com/semlinker/awesome-typescript/issues/27
 */
type JoinStrArray<
  Arr extends string[],
  Separator extends string
> = Arr extends [infer A, ...infer B]
  ? `${A extends string ? A : ""}${B extends [string, ...string[]]
      ? `${Separator}${JoinStrArray<B, Separator>}`
      : ""}`
  : "";

type Names = ["Sem", "Lolo", "Kaquko"];
type NamesComma = JoinStrArray<Names, ",">; // "Sem,Lolo,Kaquko"
type NamesSpace = JoinStrArray<Names, " ">; // "Sem Lolo Kaquko"
type NamesStars = JoinStrArray<Names, "⭐️">; // "Sem⭐️Lolo⭐️Kaquko"

export {};