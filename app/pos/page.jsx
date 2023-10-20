'use client';

import React from 'react';
import Console from '../tempates/console/console';

export default function Pos() {
    return (
        <Console>
            <div class="relative flex">
                <div class="w-[1240px] p-2 md:p-7">main</div>
                <div class="w-[409px] bg-white p-4">side</div>
            </div>
        </Console>
    )
}