"use client"
import { Button } from '@/components/ui/button';
import { slides } from '@/lib/data';
import { cn } from '@/lib/utils';
import { sendGAEvent } from '@next/third-parties/google';
import { useParams } from 'next/navigation';
import React from 'react'

export default function page() {
    const params = useParams<{ id: string }>()
    return (
        <div className='flex flex-col space-y-4 mt-16'>
            <div className="relative lg:h-[35rem] text-white">
                <div className="slider-container">
                    <div className="relative h-[20rem] lg:h-[35rem]">
                        <div className={cn(`absolute inset-0 transition-opacity duration-1000 opacity-100 bg-primary`, slides[Number(params.id) - 1].color)} />
                        <div className="relative h-full w-full"
                        // style={{
                        //     backgroundImage: `url(${slide.imageUrl})`,
                        //     backgroundSize: 'cover',
                        //     backgroundPosition: 'right',
                        // }}
                        >
                            <div className="absolute h-full w-1/2 bg-gradient-to-r from-black/60  to-transparent" />
                            <div className="absolute flex flex-col items-start justify-center h-full p-10 md:x-7 lg:px-36 px-4 w-full lg:w-1/2">
                                <h1 className="text-2xl lg:text-5xl font-bold">{slides[Number(params.id) - 1].title}</h1>
                                <p className="mt-4 mb-2 text-md lg:text-lg">{slides[Number(params.id) - 1].description} <label className='font-bold'>+856 20 777 077 92</label></p>
                                <Button onClick={() => {
                                    sendGAEvent('event', 'Promotion Interest Trigger', { value: 'xyz' })
                                    // router.push(`/ads/${index + 1}`);
                                }}>
                                    ສົນໃຈລົງທະບຽນ
                                </Button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
            <div className='md:x-7 lg:px-36 px-4 flex flex-col space-y-6'>
                <div className='text-2xl font-bold'>
                    Lorem ipsum dolor sit amet
                </div>
                <div className=''>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris risus tortor, ornare porta nisl vitae, sodales consectetur felis. Maecenas vitae leo in arcu accumsan vulputate. Sed nec tristique urna. Morbi ut lectus a enim interdum rutrum a nec mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam pretium lacinia mi, non tincidunt nibh interdum ac. Fusce dictum quam at sem efficitur pellentesque. In eget ante quis mauris congue malesuada. Sed ac sapien imperdiet leo placerat hendrerit a id est. Cras feugiat feugiat nisi, non malesuada nisi rutrum ut. Sed sed vestibulum arcu. Morbi eget urna non nisi sagittis cursus at sit amet justo.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at vestibulum nulla, vitae pharetra urna. Vivamus vehicula consequat ligula sed porttitor. Duis turpis mi, vulputate eget diam nec, bibendum auctor metus. Donec at est tincidunt, bibendum urna et, ultrices libero. Quisque lobortis fringilla sapien at ornare. Nulla ullamcorper, felis sed luctus sagittis, lacus magna tempor eros, id elementum odio lacus ac augue. Pellentesque sodales consequat lacus nec posuere. Ut ligula ligula, cursus rhoncus ligula viverra, ullamcorper facilisis quam. Curabitur id dictum magna. Nam blandit quam nec est scelerisque varius. Donec feugiat quam quis lacus luctus, a vehicula dui pellentesque. Phasellus quam tellus, sollicitudin quis blandit pharetra, vestibulum eu dui.

                    Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin sapien erat, facilisis sit amet erat et, commodo semper est. Nullam sodales massa urna, eu ultrices tellus tristique eget. Donec sagittis a enim in aliquet. Maecenas augue ante, tincidunt sit amet mi nec, facilisis semper felis. Nunc molestie erat id lacus volutpat sollicitudin. Phasellus dictum in velit a vulputate. Morbi ac volutpat augue, ac semper quam. Aenean imperdiet eros venenatis tellus auctor feugiat ac quis quam. Nam molestie egestas mi eget cursus. Cras quis volutpat arcu. Praesent at dignissim nulla. Nulla dolor diam, scelerisque eu dictum quis, ultrices nec nisi. Nam in tortor pulvinar, bibendum nisl in, mollis nisi. Sed ac sem vitae tortor egestas posuere. Pellentesque quis purus in odio accumsan pellentesque.

                    Ut eget est augue. Cras malesuada, magna sollicitudin congue tristique, nisl neque lacinia tortor, vitae egestas ex leo ut odio. Mauris sapien diam, dignissim ac neque vel, efficitur placerat dui. Nulla ornare libero in dolor cursus molestie. Nunc commodo odio at consequat accumsan. Aliquam erat volutpat. Nullam ac commodo justo, ac auctor erat. Suspendisse at malesuada tellus. Vestibulum eu justo eget odio aliquet congue nec ac felis. Etiam tincidunt eros eget nisi vehicula, et sagittis ligula placerat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

                    Aliquam erat volutpat. Sed fermentum diam tempor lobortis feugiat. Cras est nisl, pellentesque in volutpat vel, porttitor sed lorem. Nunc id ex mi. Donec molestie suscipit sapien. Praesent est ligula, commodo id commodo ac, suscipit vitae dolor. Fusce pharetra, libero sed ultrices egestas, velit metus tempus felis, congue dictum diam quam et augue. Nullam lacinia justo mattis ex vulputate porta. Curabitur lacinia dapibus tempor.
                </div>
            </div>
        </div >
    )
}
