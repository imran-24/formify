"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { questionType } from "@/lib/utils";

interface QuestionTypeProps{
    onSelectType: (value: string) => void;
    type: string;
}

export function QuestionType({onSelectType, type}: QuestionTypeProps) {

  return (
    <Select
      onValueChange={(value) => onSelectType(value)}
      value={type}
      defaultValue={type}
    >
        <SelectTrigger className="w-[180px]">
          <SelectValue
            defaultValue={type}
            placeholder='Select question type'
          />
        </SelectTrigger>
      <SelectContent>
        {questionType.map((question) => (
          <SelectItem key={question.value} value={question.value}>
            {question.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
